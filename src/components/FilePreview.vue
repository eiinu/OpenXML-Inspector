<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import { xml } from '@codemirror/lang-xml';
import vkbeautify from 'vkbeautify';

const props = defineProps<{
  filePath: string | null;
  fileContent: string | null;
  fileType: string | null;
}>();

const editorContainer = ref<HTMLElement | null>(null);
const editorView = ref<EditorView | null>(null);

// 销毁编辑器实例
const destroyEditor = () => {
  if (editorView.value) {
    editorView.value.destroy();
    editorView.value = null;
  }
};

// 创建编辑器实例
const createEditor = async (content: string) => {
  // 确保 DOM 已经更新
  await nextTick();
  
  if (!editorContainer.value) return;

  // 销毁现有编辑器
  destroyEditor();

  // 对 XML、VML 和 XML.rels 文件进行格式化
  let formattedContent = content;
  if (props.filePath?.endsWith('.xml') || props.filePath?.endsWith('.vml') || props.filePath?.endsWith('.xml.rels')) {
    formattedContent = vkbeautify.xml(content);
  }

  // 根据文件类型选择语言
  let extensions = [basicSetup];
  if (props.filePath?.endsWith('.xml') || props.filePath?.endsWith('.vml') || props.filePath?.endsWith('.xml.rels')) {
    extensions.push(xml());
  } else if (props.filePath?.endsWith('.html')) {
    extensions.push(html());
  } else if (props.filePath?.endsWith('.js')) {
    extensions.push(javascript());
  }

  const state = EditorState.create({
    doc: formattedContent,
    extensions,
  });

  editorView.value = new EditorView({
    state,
    parent: editorContainer.value,
  });
};

const formatCode = () => {
  if (!editorView.value) return;
  
  const currentContent = editorView.value.state.doc.toString();
  let formattedContent = currentContent;
  
  if (props.filePath?.endsWith('.xml') || props.filePath?.endsWith('.vml') || props.filePath?.endsWith('.xml.rels')) {
    // 使用 vkbeautify 库格式化 XML
    formattedContent = vkbeautify.xml(currentContent);
  }
  
  // 更新编辑器内容
  editorView.value.dispatch({
    changes: {
      from: 0,
      to: editorView.value.state.doc.length,
      insert: formattedContent
    }
  });
};

const copyContent = async () => {
  if (!props.fileContent) return;
  
  try {
    await navigator.clipboard.writeText(props.fileContent);
    // 可以添加一个复制成功的提示
    console.log('Content copied to clipboard');
  } catch (err) {
    console.error('Failed to copy content:', err);
  }
};

// 监听文件内容变化
watch(
  () => [props.filePath, props.fileContent],
  ([newFilePath, newContent]) => {
    if (newContent) {
      createEditor(newContent);
    } else {
      destroyEditor();
    }
  },
  { immediate: true }
);

onMounted(() => {
  if (props.fileContent) {
    createEditor(props.fileContent);
  }
});
</script>

<template>
  <div class="file-preview">
    <div class="preview-header">
      <h2>{{ filePath || '未选择文件' }}</h2>
      <div class="preview-actions">
        <button 
          v-if="fileType === 'xml' || fileType === 'text'" 
          class="action-button"
          @click="formatCode"
        >
          格式化
        </button>
        <button 
          v-if="fileContent" 
          class="action-button"
          @click="copyContent"
        >
          复制
        </button>
      </div>
    </div>
    <div class="preview-content">
      <div v-if="!filePath" class="empty-state">
        <p>请从左侧选择一个文件查看内容</p>
      </div>
      <div v-else-if="fileType === 'image'" class="image-preview">
        <img :src="fileContent || undefined" alt="Image preview" />
      </div>
      <div v-else-if="fileType === 'video'" class="video-preview">
        <video controls :src="fileContent || undefined"></video>
      </div>
      <div v-else class="code-preview">
        <div ref="editorContainer" class="editor-container"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.file-preview {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.preview-header {
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.preview-header h2 {
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: #1e293b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  margin-right: 16px;
}

.preview-actions {
  display: flex;
  gap: 8px;
}

.action-button {
  padding: 6px 12px;
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

.preview-content {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #64748b;
  font-size: 14px;
}

.image-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
}

.image-preview img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.video-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
}

.video-preview video {
  max-width: 100%;
  max-height: 100%;
}

.code-preview {
  height: 100%;
  overflow: hidden;
}

.editor-container {
  height: 100%;
}

/* CodeMirror 样式覆盖 */
:deep(.cm-editor) {
  height: 100%;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 13px;
}

:deep(.cm-scroller) {
  overflow: auto;
}

:deep(.cm-gutters) {
  background-color: #f8fafc !important;
  border-right: 1px solid #e2e8f0 !important;
}

:deep(.cm-activeLineGutter) {
  background-color: #f1f5f9 !important;
}

:deep(.cm-activeLine) {
  background-color: rgba(241, 245, 249, 0.5) !important;
}
</style>