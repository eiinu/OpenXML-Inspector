<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

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

const props = defineProps<{
  fileStructure: FileSystemNode[];
}>();

const emit = defineEmits<{
  (e: 'file-select', filePath: string, type: string): void
}>();

const fileTree = ref<FileSystemNode[]>([]);

const expandedNodes = ref<Set<string>>(new Set());

const toggleNode = (path: string) => {
  if (expandedNodes.value.has(path)) {
    expandedNodes.value.delete(path);
  } else {
    expandedNodes.value.add(path);
  }
};

const selectFile = (filePath: string) => {
  // 根据文件扩展名判断类型
  let type = 'text';
  if (filePath.endsWith('.xml') || filePath.endsWith('.vml') || filePath.endsWith('.xml.rels')) {
    type = 'xml';
  } else if (filePath.endsWith('.png') || filePath.endsWith('.jpg') || filePath.endsWith('.jpeg') || filePath.endsWith('.gif') || filePath.endsWith('.svg')) {
    type = 'image';
  } else if (filePath.endsWith('.mp4') || filePath.endsWith('.avi') || filePath.endsWith('.mov')) {
    type = 'video';
  }
  
  emit('file-select', filePath, type);
};

const getFileIcon = (fileName: string) => {
  if (fileName.endsWith('.xml') || fileName.endsWith('.vml') || fileName.endsWith('.xml.rels')) {
    return '📄';
  } else if (fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || fileName.endsWith('.gif') || fileName.endsWith('.svg')) {
    return '🖼️';
  } else if (fileName.endsWith('.mp4') || fileName.endsWith('.avi') || fileName.endsWith('.mov')) {
    return '🎬';
  } else {
    return '📄';
  }
};

const expandAllNodes = (nodes: FileSystemNode[]) => {
  nodes.forEach(node => {
    expandedNodes.value.add(node.path);
    if (node.type === 'directory' && node.children) {
      expandAllNodes(node.children);
    }
  });
};

const expandAll = () => {
  expandedNodes.value.clear();
  expandAllNodes(fileTree.value);
};

const collapseAll = () => {
  expandedNodes.value.clear();
};

watch(
  () => props.fileStructure,
  (newStructure) => {
    fileTree.value = newStructure;
    expandedNodes.value.clear();
    expandAllNodes(newStructure);
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <div class="file-tree">
    <div class="tree-header">
      <h2>文件结构</h2>
      <div class="tree-actions">
        <button class="action-button" @click="expandAll">全部展开</button>
        <button class="action-button" @click="collapseAll">全部折叠</button>
      </div>
    </div>
    <div class="tree-content">
      <div v-if="fileTree.length === 0" class="empty-state">
        <p>请上传一个 docx/xlsx/pptx 文件</p>
      </div>
      <div v-else>
        <div v-for="node in fileTree" :key="node.path" class="tree-node">
          <div 
            v-if="node.type === 'directory'" 
            class="directory-node"
            @click="toggleNode(node.path)"
          >
            <span class="toggle-icon">
              {{ expandedNodes.has(node.path) ? '▼' : '▶' }}
            </span>
            <span class="node-name directory">{{ node.name }}</span>
          </div>
          <div 
            v-else 
            class="file-node"
            @click="selectFile(node.path)"
          >
            <span class="file-icon">
              {{ getFileIcon(node.name) }}
            </span>
            <span class="node-name file">{{ node.name }}</span>
          </div>
          <div 
            v-if="node.type === 'directory' && expandedNodes.has(node.path) && node.children" 
            class="tree-children"
          >
            <div v-for="child in node.children" :key="child.path" class="tree-node">
              <div 
                v-if="child.type === 'directory'" 
                class="directory-node"
                @click="toggleNode(child.path)"
              >
                <span class="toggle-icon">
                  {{ expandedNodes.has(child.path) ? '▼' : '▶' }}
                </span>
                <span class="node-name directory">{{ child.name }}</span>
              </div>
              <div 
                v-else 
                class="file-node"
                @click="selectFile(child.path)"
              >
                <span class="file-icon">
                  {{ getFileIcon(child.name) }}
                </span>
                <span class="node-name file">{{ child.name }}</span>
              </div>
              <div 
                v-if="child.type === 'directory' && expandedNodes.has(child.path) && child.children" 
                class="tree-children"
              >
                <div v-for="grandchild in child.children" :key="grandchild.path" class="tree-node">
                  <div 
                    v-if="grandchild.type === 'directory'" 
                    class="directory-node"
                    @click="toggleNode(grandchild.path)"
                  >
                    <span class="toggle-icon">
                      {{ expandedNodes.has(grandchild.path) ? '▼' : '▶' }}
                    </span>
                    <span class="node-name directory">{{ grandchild.name }}</span>
                  </div>
                  <div 
                    v-else 
                    class="file-node"
                    @click="selectFile(grandchild.path)"
                  >
                    <span class="file-icon">
                      {{ getFileIcon(grandchild.name) }}
                    </span>
                    <span class="node-name file">{{ grandchild.name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.file-tree {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.tree-header {
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tree-header h2 {
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: #1e293b;
  flex: 1;
  margin-right: 16px;
}

.tree-actions {
  display: flex;
  gap: 8px;
}

.action-button {
  padding: 4px 8px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  background: #fff;
  font-size: 12px;
  cursor: pointer;
  color: #334155;
  transition: all 0.2s ease;
}

.action-button:hover {
  background: #f1f5f9;
  border-color: #64748b;
}

.action-button:active {
  background: #e2e8f0;
}

.tree-content {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #64748b;
  font-size: 14px;
}

.tree-node {
  position: relative;
}

.directory-node,
.file-node {
  display: flex;
  align-items: center;
  padding: 6px 16px;
  cursor: pointer;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.directory-node:hover,
.file-node:hover {
  background: #f1f5f9;
}

.file-node {
  padding-left: 32px;
}

.file-icon {
  width: 16px;
  text-align: center;
  margin-right: 8px;
  font-size: 12px;
}

.toggle-icon {
  width: 16px;
  text-align: center;
  margin-right: 8px;
  font-size: 10px;
  color: #64748b;
}

.node-name {
  flex: 1;
}

.node-name.directory {
  font-weight: 500;
  color: #334155;
}

.node-name.file {
  color: #64748b;
}

.tree-children {
  margin-left: 16px;
  border-left: 1px solid #e2e8f0;
  margin-left: 24px;
}

/* 滚动条样式 */
.tree-content::-webkit-scrollbar {
  width: 8px;
}

.tree-content::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.tree-content::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.tree-content::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>