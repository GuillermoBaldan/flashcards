// Game.tsx
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Card from "@components/Card/Card";
import Button from "@components/Button/Button";
import { GameProps } from "@types";

const Game: React.FC<GameProps> = ({ question }) => {
  const renderAnswers = (answers: { [key: string]: string } | undefined) => {
    if (!answers) return null;
    return Object.keys(answers).map((key) => (
      <Row key={key} className="d-flex flex-column my-4">
        <Button
          className={`fs-4 ${question.correctAnswer !== key ? "incorrect" : ""}`}
        >
          {answers[key]}
        </Button>
      </Row>
    ));
  };

  return (
    <div className="Game">
      {question && (
        <div key={question.id} className="mt-4">
          <Card isSelected>{question.question}</Card>
          <Row>
            <Col className="mt-5 px-4">{renderAnswers(question.answers)}</Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default Game;
