<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import JSZip from 'jszip';
import FileTree from './components/FileTree.vue';
import FilePreview from './components/FilePreview.vue';
import { openXmlRules, type OpenXmlRule } from './data/openxmlRules';

interface FileNode {
  name: string;
  path: string;
  type: 'file';
}

interface DirectoryNode {
  name: string;
  path: string;
  type: 'directory';
  children: Array<DirectoryNode | FileNode>;
}

type FileSystemNode = DirectoryNode | FileNode;

const selectedFile = ref<string | null>(null);
const fileContent = ref<string | null>(null);
const fileType = ref<string | null>(null);
const fileStructure = ref<FileSystemNode[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

const zipInstance = ref<JSZip | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const queryKeyword = ref('');
const selectedRule = ref<OpenXmlRule | null>(null);
const activeWorkspaceTab = ref<'inspector' | 'rules'>('rules');


const hasFile = computed(() => fileStructure.value.length > 0);

const filteredRules = computed(() => {
  const keyword = queryKeyword.value.trim().toLowerCase();
  if (!keyword) {
    return openXmlRules;
  }

  return openXmlRules.filter(rule => {
    const haystack = [
      rule.title,
      rule.category,
      rule.path,
      rule.description,
      ...rule.tags,
      ...rule.highlights,
      ...rule.commonValues.map(item => `${item.name} ${item.value} ${item.note}`)
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(keyword);
  });
});

const openFileDialog = () => {
  fileInput.value?.click();
};

const handleRuleSelect = (rule: OpenXmlRule) => {
  selectedRule.value = rule;
  activeWorkspaceTab.value = 'rules';
};

const handleFileSelect = async (filePath: string, type: string) => {
  if (!zipInstance.value) return;

  loading.value = true;
  try {
    const file = zipInstance.value.file(filePath);
    if (!file) {
      fileContent.value = null;
      fileType.value = null;
      return;
    }

    if (type === 'image' || type === 'video') {
      const blob = await file.async('blob');
      fileContent.value = URL.createObjectURL(blob);
    } else {
      fileContent.value = await file.async('text');
    }

    selectedFile.value = filePath;
    fileType.value = type;
    activeWorkspaceTab.value = 'inspector';
  } catch (err) {
    error.value = '文件内容读取失败';
    console.error('Error reading file content:', err);
  } finally {
    loading.value = false;
  }
};

const handleFileUpload = async (file: File | undefined) => {
  if (!file) return;

  loading.value = true;
  error.value = null;

  try {
    const zip = new JSZip();
    await zip.loadAsync(file);
    zipInstance.value = zip;
    fileStructure.value = buildFileStructure(zip);
    selectedFile.value = null;
    fileContent.value = null;
    fileType.value = null;
    activeWorkspaceTab.value = 'inspector';
  } catch (err) {
    error.value = '文件解析失败，请确保上传的是有效的 docx/xlsx/pptx 文件';
    console.error('Error parsing file:', err);
  } finally {
    loading.value = false;
  }
};

const buildFileStructure = (zip: JSZip): FileSystemNode[] => {
  const structure: FileSystemNode[] = [];
  const directories: Record<string, FileSystemNode[]> = {};

  zip.forEach((relativePath, file) => {
    if (file.dir) {
      if (!directories[relativePath]) directories[relativePath] = [];
    } else {
      const parts = relativePath.split('/');
      const fileName = parts.pop()!;
      const directoryPath = parts.join('/');

      if (directoryPath) {
        if (!directories[directoryPath]) directories[directoryPath] = [];
        directories[directoryPath].push({ name: fileName, path: relativePath, type: 'file' });
      } else {
        structure.push({ name: fileName, path: relativePath, type: 'file' });
      }
    }
  });

  Object.entries(directories).forEach(([dirPath, files]) => {
    if (files.length > 0) {
      const parts = dirPath.split('/');
      const dirName = parts.pop()!;
      const parentPath = parts.join('/');
      const dirEntry: DirectoryNode = { name: dirName, path: dirPath, type: 'directory', children: files };

      if (parentPath) {
        let parent = structure.find(item => item.path === parentPath);
        if (!parent) {
          createParentDirectories(parentPath, structure, directories);
          parent = structure.find(item => item.path === parentPath);
        }
        if (parent && parent.type === 'directory') parent.children.push(dirEntry);
      } else {
        structure.push(dirEntry);
      }
    }
  });

  return structure.filter(node => (node.type === 'directory' ? node.children.length > 0 : true));
};

const createParentDirectories = (dirPath: string, structure: FileSystemNode[], directories: Record<string, FileSystemNode[]>) => {
  const parts = dirPath.split('/');
  const dirName = parts.pop()!;
  const parentPath = parts.join('/');

  if (parentPath && !structure.find(item => item.path === parentPath)) {
    createParentDirectories(parentPath, structure, directories);
  }

  const children = directories[dirPath] || [];
  if (children.length > 0) {
    structure.push({
      name: dirName,
      path: dirPath,
      type: 'directory',
      children: children as Array<DirectoryNode | FileNode>
    });
  }
};

watch(
  filteredRules,
  (rules) => {
    if (!selectedRule.value || !rules.some(rule => rule.id === selectedRule.value?.id)) {
      selectedRule.value = rules[0] ?? null;
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="app-frame">
    <main class="shell">
      <header class="topbar">
        <h1>OpenXML Inspector</h1>
        <div class="topbar-actions">
          <div class="search-input-wrap">
            <span class="search-icon">🔍</span>
            <input
              v-model="queryKeyword"
              type="text"
              placeholder="搜索标签、元素、属性、枚举值（如：w:p、TargetMode、numFmt）"
            />
          </div>
          <button class="upload-button" :disabled="loading" @click="openFileDialog">
            上传文档
          </button>
          <input
            ref="fileInput"
            type="file"
            accept=".docx,.xlsx,.pptx"
            class="hidden-file-input"
            @change="handleFileUpload(($event.target as HTMLInputElement).files?.[0])"
          />
          <span v-if="loading" class="loading">加载中...</span>
        </div>
      </header>

      <section v-if="!hasFile && !queryKeyword" class="landing">
        <div class="landing-card">
          <h2>像搜索引擎一样查询 OpenXML 规则</h2>
          <p>先查规则，再解析文档。你可以从元素、属性、枚举值、包关系路径直接开始。</p>
          <div class="landing-input">
            <span>🔎</span>
            <input
              v-model="queryKeyword"
              type="text"
              placeholder="例如：w:tbl、a:sp、formatCode、relationship"
            />
          </div>
          <div class="landing-actions">
            <button class="primary" :disabled="loading" @click="openFileDialog">上传文档开始解析</button>
            <p>支持 .docx / .xlsx / .pptx</p>
          </div>
        </div>
      </section>

      <section v-else class="workspace">
        <aside class="rules-panel">
          <div class="panel-header">
            <h2>规则查询</h2>
            <span>{{ filteredRules.length }} 条结果</span>
          </div>

          <div class="rule-list">
            <button
              v-for="rule in filteredRules"
              :key="rule.id"
              class="rule-item"
              :class="{ active: selectedRule?.id === rule.id }"
              @click="handleRuleSelect(rule)"
            >
              <div class="rule-title-row">
                <strong>{{ rule.title }}</strong>
                <small>{{ rule.category }}</small>
              </div>
              <p>{{ rule.description }}</p>
              <div class="rule-tags">
                <span v-for="tag in rule.tags" :key="tag">{{ tag }}</span>
              </div>
            </button>
            <div v-if="filteredRules.length === 0" class="empty-rule">未找到匹配规则，试试更短关键词。</div>
          </div>
        </aside>

        <section class="content-panel">
          <div v-if="hasFile" class="workspace-tabs">
            <button :class="{ active: activeWorkspaceTab === 'rules' }" @click="activeWorkspaceTab = 'rules'">规则详情</button>
            <button :class="{ active: activeWorkspaceTab === 'inspector' }" @click="activeWorkspaceTab = 'inspector'">文档解析</button>
          </div>

          <div v-if="activeWorkspaceTab === 'inspector' && hasFile" class="inspector-layout">
            <FileTree :file-structure="fileStructure" @file-select="(filePath, type) => handleFileSelect(filePath, type)" />
            <FilePreview :file-path="selectedFile" :file-content="fileContent" :file-type="fileType" />
          </div>

          <div v-else class="rule-detail">
            <template v-if="selectedRule">
              <div class="detail-header">
                <h3>{{ selectedRule.title }}</h3>
                <span>{{ selectedRule.category }}</span>
              </div>
              <p class="detail-path">常见位置：{{ selectedRule.path }}</p>
              <p class="detail-description">{{ selectedRule.description }}</p>

              <section>
                <h4>关键规则</h4>
                <ul>
                  <li v-for="item in selectedRule.highlights" :key="item">{{ item }}</li>
                </ul>
              </section>

              <section>
                <h4>属性/值速查</h4>
                <table>
                  <thead>
                    <tr>
                      <th>属性</th>
                      <th>典型值</th>
                      <th>说明</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in selectedRule.commonValues" :key="`${item.name}-${item.value}`">
                      <td>{{ item.name }}</td>
                      <td>{{ item.value }}</td>
                      <td>{{ item.note }}</td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </template>
            <div v-else class="empty-rule">请在左侧输入关键词并选择规则。</div>
          </div>
        </section>
      </section>

      <footer v-if="error" class="footer error">{{ error }}</footer>
    </main>
  </div>
</template>

<style scoped>
:global(*) { box-sizing: border-box; }
:global(html),
:global(body),
:global(#app) {
  margin: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

:global(body) {
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: #fff;
  color: #0f172a;
}

:global(button), :global(input), :global(textarea), :global(select) { font: inherit; }

.app-frame {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.shell {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 64px 1fr;
  overflow: hidden;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 0 20px;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
}

.topbar h1 {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  color: #0f172a;
  white-space: nowrap;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  flex: 1;
  justify-content: flex-end;
}

.search-input-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  padding: 8px 10px;
  background: #fff;
  width: min(620px, 100%);
}

.search-input-wrap input {
  border: none;
  outline: none;
  width: 100%;
  font-size: 13px;
}

.search-icon {
  opacity: 0.6;
}

.upload-button {
  border: 1px solid #334155;
  background: #0f172a;
  color: #fff;
  border-radius: 10px;
  padding: 8px 12px;
  cursor: pointer;
}

.upload-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.hidden-file-input {
  display: none;
}

.loading {
  font-size: 12px;
  color: #64748b;
}

.landing {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.landing-card {
  width: min(900px, 100%);
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  padding: 40px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  text-align: center;
}

.landing-card h2 {
  margin: 0 0 10px;
  font-size: 34px;
}

.landing-card p {
  margin: 0;
  color: #475569;
}

.landing-input {
  margin-top: 26px;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #cbd5e1;
  background: #fff;
  border-radius: 14px;
  padding: 14px 16px;
}

.landing-input input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 18px;
}

.landing-actions {
  margin-top: 20px;
}

.landing-actions .primary {
  border: 1px solid #334155;
  background: #0f172a;
  color: #fff;
  border-radius: 10px;
  padding: 10px 16px;
  cursor: pointer;
}

.landing-actions p {
  margin-top: 10px;
  font-size: 12px;
}

.workspace {
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(320px, 420px) minmax(0, 1fr);
}

.rules-panel {
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.panel-header {
  padding: 14px 16px;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.panel-header h2 {
  margin: 0;
  font-size: 14px;
}

.panel-header span {
  font-size: 12px;
  color: #64748b;
}

.rule-list {
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rule-item {
  width: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #fff;
  padding: 12px;
  text-align: left;
  cursor: pointer;
}

.rule-item.active {
  border-color: #0f172a;
  box-shadow: 0 0 0 1px #0f172a inset;
}

.rule-title-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}

.rule-title-row strong {
  font-size: 14px;
}

.rule-title-row small {
  color: #64748b;
}

.rule-item p {
  margin: 8px 0;
  color: #475569;
  font-size: 12px;
}

.rule-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.rule-tags span {
  font-size: 11px;
  padding: 2px 8px;
  background: #f1f5f9;
  border-radius: 99px;
  color: #334155;
}

.content-panel {
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.workspace-tabs {
  padding: 10px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  gap: 8px;
}

.workspace-tabs button {
  border: 1px solid #cbd5e1;
  background: #fff;
  border-radius: 8px;
  padding: 6px 10px;
  cursor: pointer;
}

.workspace-tabs button.active {
  border-color: #0f172a;
  color: #0f172a;
  font-weight: 600;
}

.inspector-layout {
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(260px, 360px) minmax(0, 1fr);
  flex: 1;
}

.inspector-layout > * {
  min-height: 0;
  border-right: 1px solid #e2e8f0;
}

.inspector-layout > *:last-child {
  border-right: none;
}

.rule-detail {
  padding: 22px;
  overflow: auto;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
}

.detail-header h3 {
  margin: 0;
  font-size: 22px;
}

.detail-header span {
  color: #64748b;
  font-size: 13px;
}

.detail-path {
  margin: 10px 0;
  color: #0f172a;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
}

.detail-description {
  color: #475569;
  margin-bottom: 20px;
}

.rule-detail section h4 {
  margin-bottom: 10px;
}

.rule-detail ul {
  margin: 0;
  padding-left: 18px;
  color: #334155;
}

.rule-detail table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #e2e8f0;
}

.rule-detail th,
.rule-detail td {
  border: 1px solid #e2e8f0;
  padding: 8px 10px;
  text-align: left;
  font-size: 13px;
}

.rule-detail th {
  background: #f8fafc;
}

.empty-rule {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 160px;
  color: #64748b;
}

.footer {
  padding: 6px 10px;
  font-size: 12px;
  border-top: 1px solid #fecaca;
}

.error {
  color: #b91c1c;
  background: #fef2f2;
}

@media (max-width: 1024px) {
  .workspace {
    grid-template-columns: 1fr;
    grid-template-rows: minmax(240px, 45%) 1fr;
  }

  .rules-panel {
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
  }
}

@media (max-width: 768px) {
  .topbar {
    padding: 0 12px;
  }

  .topbar h1 {
    display: none;
  }

  .landing-card {
    padding: 24px;
  }

  .landing-card h2 {
    font-size: 24px;
  }

  .inspector-layout {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }

  .inspector-layout > * {
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
  }

  .inspector-layout > *:last-child {
    border-bottom: none;
  }
}
</style>
