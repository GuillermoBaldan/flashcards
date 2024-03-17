import React from "react";
import { Row, Col } from "react-bootstrap";
import Card from "@components/Card/Card";
import { MazoCartasProps } from "@types";
import "./MazoCartas.scss";

const MazoCartas: React.FC<MazoCartasProps> = ({ cards, onSelectQuestion }) => {
  const handleQuestionSelect = (questionId: number) => {
    onSelectQuestion(questionId); // Pasar el ID de la pregunta
  };

  return (
    <div className="mazo-cartas position-relative">
      <Col className="m-0">
        {cards.map((card) => (
          <Row
            key={card.id}
            className="px-2 card-wrapper position-relative"
            onClick={() => handleQuestionSelect(card.id)}
          >
            <Card isSelected={card.isSelected}>{card.question}</Card>
          </Row>
        ))}
      </Col>
    </div>
  );
};

export default MazoCartas;
