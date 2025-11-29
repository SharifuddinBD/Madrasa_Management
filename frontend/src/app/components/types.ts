export type NoticeType = {
  id: number;
  title: string;
  content: string;
  date: Date;
  type: 'info' | 'warning' | 'success';
};
