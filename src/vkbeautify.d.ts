declare module 'vkbeautify' {
  export function xml(text: string, indent?: string): string;
  export function json(text: string, indent?: string): string;
  export function css(text: string, indent?: string): string;
  export function sql(text: string, indent?: string): string;
  export function xmlmin(text: string, preserveComments?: boolean): string;
  export function jsonmin(text: string): string;
  export function cssmin(text: string): string;
  export function sqlmin(text: string): string;
}
