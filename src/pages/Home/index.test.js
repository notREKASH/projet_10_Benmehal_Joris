import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
    await screen.findByText("Email");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await waitFor(() => screen.findByText("Message envoyé !"), {
        timeout: 3000,
      });
    });
  });
});

describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    render(<Home />);
    screen.getByTestId("event-list-testid");
  });
  it("a list a people is displayed", () => {
    render(<Home />);
    const peopleListElement = screen.getAllByTestId("people-list-testid");
    expect(peopleListElement).toHaveLength(6);
  });
  it("a footer is displayed", () => {
    render(<Home />);
    screen.getByTestId("footer-testid");
  });
  it("an event card, with the last event, is displayed", () => {
    render(<Home />);
    const footerElement = screen.getByTestId("footer-testid");
    const eventCardElement = screen.getByTestId("card-testid");
    expect(footerElement).toContainElement(eventCardElement);
  });
});
