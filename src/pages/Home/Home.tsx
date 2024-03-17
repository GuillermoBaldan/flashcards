// Home.tsx
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Section from "@components/Section/Section";
import MazoCartas from "@components/MazoCartas/MazoCartas";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cartasData from "./cartas.json";
import Game from "@components/Game/Game";
import Collections from "@components/Collections/Collections";
import { Carta, Colecciones } from "@types";

export default function Home() {
  const colecciones: Colecciones = cartasData;
  const collectionKeys = Object.keys(colecciones) as (keyof Colecciones)[];

  const [selectedColeccion, setSelectedColeccion] = useState<keyof Colecciones>(
    collectionKeys[0]
  );

  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(
    null
  );

  const handleSelectColeccion = (coleccion: keyof Colecciones) => {
    setSelectedColeccion(coleccion);
    setSelectedQuestionId(null);
  };

  const handleSelectQuestion = (questionId: number) => {
    setSelectedQuestionId(questionId);
  };

  const filteredCards: Carta[] = colecciones[selectedColeccion] || [];

  const selectedQuestion = selectedQuestionId
    ? filteredCards.find((card) => card.id === selectedQuestionId)
    : null;

  return (
    <main>
      <Row className="d-flex h-100">
        <Col className="d-flex flex-column gap-3">
          <Section>
            {filteredCards.length > 0 ? (
              <MazoCartas
                cards={filteredCards}
                onSelectQuestion={handleSelectQuestion}
              />
            ) : (
              <p>No hay cartas disponibles en esta colección.</p>
            )}
          </Section>
        </Col>
        <Col>
          <Section>
            <div className="d-flex align-items-start gap-4">
              <h2 className="subtitle">Juega Ya!</h2>
              <FontAwesomeIcon
                className="subtitle clickable"
                icon={faPlayCircle}
              />
            </div>
            <div>
              {selectedQuestion ? (
                <Game question={selectedQuestion} />
              ) : (
                <p>Selecciona una pregunta para jugar.</p>
              )}
            </div>
          </Section>
        </Col>
        <Col>
          <Row>
            <Section>
              <Collections
                collections={collectionKeys}
                onSelectCollection={handleSelectColeccion}
              />
            </Section>
          </Row>
          <Row></Row>
        </Col>
      </Row>
    </main>
  );
}
