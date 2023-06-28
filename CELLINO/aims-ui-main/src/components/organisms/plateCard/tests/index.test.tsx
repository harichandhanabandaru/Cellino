import React from "react";
import { render, screen } from "@testing-library/react";
import { Scanning } from "../../KanbanViewCards/tests/mockData";
import CardBox from "..";
import { BrowserRouter, Routes, Route } from "react-router-dom";

test("renders plateCard", () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<CardBox cardDetails={Scanning[0]} />} />
      </Routes>
    </BrowserRouter>
  );
  const linkElement = screen.getByTestId("plateCard");
  expect(linkElement).toBeInTheDocument();
});
