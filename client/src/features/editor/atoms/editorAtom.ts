import { atom } from 'jotai';
import { Editor } from '@tiptap/core';

export const editorAtom = atom<Editor | null>(null);

export const titleEditorAtom = atom<Editor | null>(null);
