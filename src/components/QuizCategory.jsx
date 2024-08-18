import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import Input from "./Input";
import Spinner from "./Spinner";
import "./QuizCategory.css";
import Select from "./Select";
import { useState } from "react";
export default function QuizCategory() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Spinner state
  const [fieldsData, setFieldsData] = useState({
    amount: "",
    category: "",
    difficulty: "",
  });
  const validateConfig = {
    amount: [
      { required: true, message: "Please Enter the Number of quizes !" },
      { minAmount: 9, message: "Quizes amount should be Minimum 10." },
      { maxAmount: 30, message: "Quizes amount should be Maximum 30." },
    ],
    category: [{ required: true, message: "Please select a category !" }],
    difficulty: [{ required: true, message: "Please select a Difficulty !" }],
  };

  const validate = (formData) => {
    const errorsData = {};

    Object.entries(formData).forEach(([key, value]) => {
      validateConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorsData[key] = rule.message;
          return true;
        }
        if (rule.minAmount && value < rule.minAmount) {
          errorsData[key] = rule.message;
          return true;
        }
        if (rule.maxAmount && value > rule.maxAmount) {
          errorsData[key] = rule.message;
          return true;
        }
      });
    });

    setErrors(errorsData);
    return errorsData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorsData = validate(fieldsData);

    if (Object.keys(errorsData).length) return;

    setIsLoading(true); // Show spinner

    const data = getFormData(e.target);
    let query = `amount=${data.amount}`;
    if (data.category !== "All") {
      query += `&category=${data.category}`;
    }
    if (data.difficulty !== "All") {
      query += `&difficulty=${data.difficulty}`;
    }

    fetchQuizes(query).then((data) => {
      setIsLoading(false); // Hide spinner
      navigate("/quizes/:quiz", { state: data["results"] });
    });
  };

  const fetchQuizes = async (query) => {
    const url = `https://opentdb.com/api.php?${query}&type=multiple`;
    const result = await (await fetch(url)).json();
    return result;
  };
  const getFormData = (form) => {
    const formData = new FormData(form);
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    return data;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldsData((prevState) => ({ ...prevState, [name]: value }));
    setErrors({});
  };
  return (
    <div className="quiz-category">
      <div className="logo-container">
        <img src={logo} alt="logo" className="logo" />
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          id="amount"
          label="Number of Questions"
          classname="input-container"
          placeholder="Please Enter the Number of Question"
          name="amount"
          value={fieldsData.amount}
          onchange={handleChange}
          error={errors.amount}
        />
        <Select
          id="category"
          label="Select Category"
          classname="input-container"
          name="category"
          value={fieldsData.category}
          onchange={handleChange}
          error={errors.category}
          defaultOption="Select Category"
          options={[
            { id: "All", categoryName: "All" },
            { id: 9, categoryName: "General Knowledge" },
            { id: 10, categoryName: "Entertainment: Books" },
            { id: 17, categoryName: "Science & Nature" },
            { id: 18, categoryName: "Science: Computers" },
            { id: 19, categoryName: "Science: Mathematics" },
            { id: 20, categoryName: "Mythology" },
            { id: 21, categoryName: "Sports" },
            { id: 22, categoryName: "Geography" },
            { id: 23, categoryName: "History" },
            { id: 24, categoryName: "Politics" },
            { id: 25, categoryName: "Art" },
            { id: 26, categoryName: "Celebrities" },
            { id: 27, categoryName: "Animals" },
            { id: 28, categoryName: "Vehicles" },
            { id: 29, categoryName: "Entertainment:Comics" },
            { id: 30, categoryName: "Science: Gadgets" },
            { id: 31, categoryName: "Entertainment: Japanese Anime & Manga" },
            { id: 32, categoryName: "Entertainment: Cartoon & Animayions" },
          ]}
        />
        <Select
          id="difficulty"
          label="Select Difficulty"
          classname="input-container"
          name="difficulty"
          value={fieldsData.difficulty}
          onchange={handleChange}
          error={errors.difficulty}
          defaultOption="Select Difficulty"
          options={[
            { id: "All", categoryName: "All" },
            { id: "easy", categoryName: "Easy" },
            { id: "medium", categoryName: "Medium" },
            { id: "hard", categoryName: "Hard" },
          ]}
        />
        <div className="button-container">
          <button type="submit" className="submit">
            {isLoading ? <Spinner /> : "Start Quiz"}
          </button>
        </div>
      </form>
    </div>
  );
}
