import toast from "react-hot-toast";
import css from "./SearchBar.module.css";
import { FormEvent } from "react";

interface SearchBarProps {
  onSubmit: (img: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const inputElement = form.elements.namedItem("search") as HTMLInputElement; // Явно приводимо до HTMLInputElement
    const formValue = inputElement.value.trim(); // Отримуємо значення поля

    console.dir(form, "form");
    console.log(formValue, "formValue");

    if (formValue === "") {
      toast.error("Please, input value for search");
      return;
    }
    console.log(formValue, "form value in search");
    onSubmit(formValue);

    form.reset();
  }

  return (
    <section className={css.searchSection}>
      <form onSubmit={handleSubmit} className={css.searchform}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
        />
        <button type="submit">Search</button>
      </form>
    </section>
  );
};

export default SearchBar;
