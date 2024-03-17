import React, { useState } from "react";
import Button from "@components/Button/Button";
import { Col, Row } from "react-bootstrap";
import { CollectionProps } from "@types";

const Collections: React.FC<CollectionProps> = ({
  collections,
  onSelectCollection,
}) => {
  const [selectedCollection, setSelectedCollection] = useState<string>(
    collections[0]
  );

  const handleCollectionSelect = (collection: string) => {
    setSelectedCollection(collection);
    onSelectCollection(collection);
  };

  return (
    <Col>
      <Row>
        <h2 className="subtitle">Collection</h2>
      </Row>
      <Row className="d-flex flex-column p-3 gap-3">
        {collections.map((collection) => (
          <Button
            key={collection}
            className={`fs-4 ${selectedCollection === collection ? "isActive" : ""}`}
            onClick={() => handleCollectionSelect(collection)}
          >
            {collection}
          </Button>
        ))}
      </Row>
    </Col>
  );
};

export default Collections;
