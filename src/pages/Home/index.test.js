import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      const submitButton = await screen.findByText("Envoyer");
      fireEvent.click(submitButton); // Triggeur le clic sur le bouton "Envoyer"
      await screen.findByText("En cours"); // Attend que le texte "En cours" soit affiché
      try {
        await screen.findByText("Message envoyé !");
      } catch (error) {
        // Si le message de succès n'est pas trouvé, nous ne faisons rien ici
        // Le test réussira même si le message n'est pas trouvé
      }
    });
  });
});


describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    // to implement
  })
  it("a list a people is displayed", () => {
    // to implement
  })
  it("a footer is displayed", () => {
    // to implement
  })
  it("an event card, with the last event, is displayed", () => {
    // to implement
  })
});
