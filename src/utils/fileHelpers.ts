// fileHelpers.ts
export const isImage = (url: string) => {
    return /\.(jpeg|jpg|gif|png|svg|webp|bmp)$/i.test(url);
  };
  
  export const isFile = (url: string) => {
    return /\.(pdf|doc|docx|xls|xlsx|zip|txt|ppt|pptx)$/i.test(url);
  };
  