export interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className: string;
}

export type ButtonType = {
  onClick?: () => void;
  children: React.ReactNode;
  className: string;
};
