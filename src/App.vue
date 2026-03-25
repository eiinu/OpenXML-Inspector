<script setup lang="ts">
import { ref } from 'vue';
import JSZip from 'jszip';
import FileTree from './components/FileTree.vue';
import FilePreview from './components/FilePreview.vue';

const fileTree = ref<any>(null);
const selectedFile = ref<string | null>(null);
const fileContent = ref<string | null>(null);
const fileType = ref<string | null>(null);
const fileStructure = ref<FileSystemNode[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

const zipInstance = ref<JSZip | null>(null);

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

    if (type === 'image') {
      // 处理图片文件
      const blob = await file.async('blob');
      fileContent.value = URL.createObjectURL(blob);
    } else if (type === 'video') {
      // 处理视频文件
      const blob = await file.async('blob');
      fileContent.value = URL.createObjectURL(blob);
    } else {
      // 处理文本文件
      const content = await file.async('text');
      fileContent.value = content;
    }

    selectedFile.value = filePath;
    fileType.value = type;
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
    const structure = buildFileStructure(zip);
    fileStructure.value = structure;
  } catch (err) {
    error.value = '文件解析失败，请确保上传的是有效的 docx/xlsx/pptx 文件';
    console.error('Error parsing file:', err);
  } finally {
    loading.value = false;
  }
};

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

const buildFileStructure = (zip: JSZip): FileSystemNode[] => {
  const structure: FileSystemNode[] = [];

  const directories: Record<string, FileSystemNode[]> = {};

  // 遍历所有文件
  zip.forEach((relativePath, file) => {
    if (file.dir) {
      // 创建目录结构
      if (!directories[relativePath]) {
        directories[relativePath] = [];
      }
    } else {
      // 处理文件
      const parts = relativePath.split('/');
      const fileName = parts.pop()!;
      const directoryPath = parts.join('/');

      if (directoryPath) {
        if (!directories[directoryPath]) {
          directories[directoryPath] = [];
        }
        directories[directoryPath].push({
          name: fileName,
          path: relativePath,
          type: 'file'
        });
      } else {
        // 根目录文件
        structure.push({
          name: fileName,
          path: relativePath,
          type: 'file'
        });
      }
    }
  });

  // 处理目录
  Object.entries(directories).forEach(([dirPath, files]) => {
    const parts = dirPath.split('/');
    const dirName = parts.pop()!;
    const parentPath = parts.join('/');

    const dirEntry = {
      name: dirName,
      path: dirPath,
      type: 'directory' as const,
      children: files
    };

    if (parentPath) {
      // 找到父目录并添加
      let parent = structure.find(item => item.path === parentPath);
      if (!parent) {
        // 递归创建父目录
        createParentDirectories(parentPath, structure, directories);
        parent = structure.find(item => item.path === parentPath);
      }
      if (parent && parent.type === 'directory' && parent.children) {
        parent.children.push(dirEntry);
      }
    } else {
      structure.push(dirEntry);
    }
  });

  return structure;
};

const createParentDirectories = (dirPath: string, structure: any[], directories: any) => {
  const parts = dirPath.split('/');
  const dirName = parts.pop()!;
  const parentPath = parts.join('/');

  if (parentPath && !structure.find(item => item.path === parentPath)) {
    createParentDirectories(parentPath, structure, directories);
  }

  structure.push({
    name: dirName,
    path: dirPath,
    type: 'directory' as const,
    children: directories[dirPath] || []
  });
};
</script>

<template>
  <div class="app-frame">
    <main class="shell">
      <header class="topbar">
        <h1>OpenXML Inspector</h1>
        <div class="upload-area">
          <input 
            type="file" 
            accept=".docx,.xlsx,.pptx" 
            @change="handleFileUpload(($event.target as HTMLInputElement).files?.[0])"
            :disabled="loading"
          />
          <span v-if="loading" class="loading">加载中...</span>
        </div>
      </header>

      <section class="layout">
        <FileTree 
          :file-structure="fileStructure" 
          @file-select="(filePath, type) => handleFileSelect(filePath, type)" 
        />
        <FilePreview 
          :file-path="selectedFile" 
          :file-content="fileContent" 
          :file-type="fileType" 
        />
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
  grid-template-rows: 60px 1fr;
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
  font-weight: 600;
  margin: 0;
  color: #1e293b;
}
.upload-area input[type="file"] {
  padding: 6px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  background: #fff;
  font-size: 14px;
  cursor: pointer;
}
.upload-area {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
}

.upload-area input[type="file"] {
  padding: 6px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  background: #fff;
  font-size: 14px;
  cursor: pointer;
}

.upload-area input[type="file"]:hover:not(:disabled) {
  border-color: #64748b;
}

.upload-area input[type="file"]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading {
  font-size: 12px;
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
.layout {
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(250px, 350px) minmax(0, 1fr);
}
.layout > * {
  min-height: 0;
  border-right: 1px solid #e2e8f0;
}
.layout > *:last-child {
  border-right: none;
}

@media (max-width: 768px) {
  .layout {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
  .layout > * {
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
  }
  .layout > *:last-child {
    border-bottom: none;
  }
}
</style>
