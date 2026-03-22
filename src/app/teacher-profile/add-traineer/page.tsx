"use client";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import SiteService from "@/services/siteNoAuth.service";
import TeacherService from "@/services/teacher.service";
import "./AddTrainer.scss";
import LmsButton from "@/components/reUseComponents/LmsButton";
import CustomSelect from "@/components/reUseComponents/Select";
import TextInput from "@/components/reUseComponents/TextInput";
import { useRouter } from "next/navigation";
import CodeEditor from "@/utils/CodeEditor";


interface Category {
  value: string;
  label: string;
}

interface TestCase {
  input: string;
  output: string;
}

interface FormErrors {
  selectedCategory?: string;
  question?: string;
  codeTemplate?: string;
  correctSolution?: string;
  testCases?: string;
}

const AddTrainer: React.FC = () => {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [codeTemplate, setCodeTemplate] = useState<string>("");
  const [correctSolution, setCorrectSolution] = useState<string>("");
  const [testCases, setTestCases] = useState<TestCase[]>([
    { input: "", output: "" },
  ]);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    document.title = "Добавление тренажера - Courserio";
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryResponse = await SiteService.getTraineerCategory({
          toSelect: true,
        });
        if (categoryResponse.status === 200 || categoryResponse.status === 201) {
            console.log(categoryResponse.data.data)
          setCategories(categoryResponse.data.data);
        }
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  // Валидация формы
  const schema = Yup.object().shape({
    selectedCategory: Yup.string().required("Выберите категорию"),
    question: Yup.string()
      .required("Введите вопрос тренажера")
      .min(10, "Минимум 10 символов"),
    codeTemplate: Yup.string().required("Введите шаблон кода"),
    correctSolution: Yup.string().required("Введите корректное решение"),
    testCases: Yup.array()
      .of(
        Yup.object().shape({
          input: Yup.string().required("Введите input теста"),
          output: Yup.string().required("Введите output теста"),
        })
      )
      .min(1, "Добавьте хотя бы один тест"),
  });

  const handleTestCaseChange = (index: number, field: "input" | "output", value: string) => {
    const updated = [...testCases];
    updated[index][field] = value;
    setTestCases(updated);
  };

  const addTestCase = () => setTestCases([...testCases, { input: "", output: "" }]);
  const removeTestCase = (index: number) =>
    setTestCases(testCases.filter((_, i) => i !== index));

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await schema.validate(
      {
        selectedCategory,
        question,
        codeTemplate,
        correctSolution,
        testCases,
      },
      { abortEarly: false }
    );

    const payload = {
      id: Number(selectedCategory),
      question,
      code_template: codeTemplate,
      correct_solution: correctSolution,
      difficulty_level: "easy",
      test_cases: testCases.map(tc => ({
        input: tc.input,
        expected_output: tc.output
      }))
    };

    const response = await TeacherService.addTrainer(payload);
    if (response.status === 200 || response.status === 201) {
      router.push("/teacher-profile/my-trainers");
    }
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      const validationErrorsObj: FormErrors = {};
      error.inner.forEach((err) => {
        if (err.path) validationErrorsObj[err.path as keyof FormErrors] = err.message;
      });
      setErrors(validationErrorsObj);
    } else {
      console.error("Error submitting form", error);
    }
  }
};

  return (
    <div className="add-trainer-container">
      <div className="add-trainer-container__title">Добавление тренажера</div>

      <div className="add-trainer-container__add-form">
        <p>Категория тренажера:</p>
<CustomSelect
  mode="single"
  options={categories}
  placeholder="Выберите язык"
  value={selectedCategory}
  onChange={setSelectedCategory}
/>
        {errors.selectedCategory && (
          <span className="error">{errors.selectedCategory}</span>
        )}

        <p>Вопрос:</p>
        <TextInput
          type="textarea"
          placeholder="Введите вопрос"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        {errors.question && <span className="error">{errors.question}</span>}

<p>Шаблон кода:</p>
<CodeEditor
  value={codeTemplate}
  onChange={setCodeTemplate}
  language= "python"
  height="200px"
/>
{errors.codeTemplate && (
  <span className="error">{errors.codeTemplate}</span>
)}

<p>Корректное решение:</p>
<CodeEditor
  value={correctSolution}
  onChange={setCorrectSolution}
  language="python"
  height="250px"
/>
{errors.correctSolution && (
  <span className="error">{errors.correctSolution}</span>
)}

        <p>Тесты:</p>
{testCases.map((tc, idx) => (
  <div key={idx} className="test-case-row">
    <TextInput
      type="textarea"
      placeholder="Input"
      value={tc.input}
      onChange={(e) =>
        handleTestCaseChange(idx, "input", e.target.value)
      }
    />
    <TextInput
      type="textarea"
      placeholder="Output"
      value={tc.output}
      onChange={(e) =>
        handleTestCaseChange(idx, "output", e.target.value)
      }
    />
    <button type="button" onClick={() => removeTestCase(idx)}>
      Удалить
    </button>
  </div>
))}
        <button type="button" onClick={addTestCase}>
          Добавить тест
        </button>

        <LmsButton buttonText="Создать тренажер" handleClick={handleSubmit} />
      </div>
    </div>
  );
};

export default AddTrainer;