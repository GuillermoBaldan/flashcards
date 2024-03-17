export interface CollectionProps {
  collections: string[];
  onSelectCollection: (collection: string) => void;
}

export type CollectionType = {
  collections: string[];
  onSelectCollection: (collection: string) => void;
};
