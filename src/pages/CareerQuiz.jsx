import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CareerQuiz.css";

const quizData = [
  {
    id: 1,
    heroImage: "/evp/images/survey/1.webp",
    hero: "The Whispering Forest: Guiding the Lost",
    question: "You begin your journey in the Whispering Forest, where you stumble upon a group of lost travelers. They are confused and looking for direction. What do you do?",
    options: [
      { option: "a", text: "Take charge, organize the group, and guide them safely through the forest." },
      { option: "b", text: "Observe the group’s dynamics and suggest improvements to ensure they work effectively together." },
      { option: "c", text: "Teach them survival skills so they can navigate the forest on their own in the future." },
      { option: "d", text: "Calculate how long it will take to lead them through the forest, considering time and resources." },
      { option: "e", text: "Speak to each traveler to understand their strengths, then guide them to roles where they can best contribute." },
      { option: "f", text: "Offer to teach them the skills and strategies they’ll need for future journeys." },
    ],
  },
  {
    id: 2,
    heroImage: "/evp/images/survey/2.webp",
    hero: "The River of Time: Repairing the Bridge",
    question: "While traveling along the River of Time, you encounter a bridge that’s fallen into disrepair. What’s your approach to fixing it?",
    options: [
      { option: "a", text: "Form a team to quickly and efficiently rebuild the bridge, ensuring everyone has a role." },
      { option: "b", text: "Inspect the broken pieces and analyze what went wrong to ensure the new bridge is built correctly." },
      { option: "c", text: "Show the villagers how to repair the bridge, sharing knowledge so they can maintain it in the future." },
      { option: "d", text: "Plan resources, materials, and time needed to ensure the bridge is rebuilt efficiently." },
      { option: "e", text: "Find individuals with the right skills for building the bridge, ensuring the best team composition." },
      { option: "f", text: "Guide and mentor the team, teaching them how to efficiently build and manage future repairs." },
    ],
  },
  {
    id: 3,
    heroImage: "/evp/images/survey/3.webp",
    hero: "The Fields of Creation: Preparing for the Festival",
    question: "Upon reaching the Fields of Creation, you’re asked to help a local town with a festival to celebrate the kingdom. What’s your contribution?",
    options: [
      { option: "a", text: "Organize the festival events to ensure every aspect runs smoothly." },
      { option: "b", text: "Ensure the event space is safe, compliant, and set up meticulously." },
      { option: "c", text: "Create vibrant banners and magical displays to inspire awe and wonder." },
      { option: "d", text: "Manage the festival’s budget and supplies, ensuring everything is prepared efficiently." },
      { option: "e", text: "Scout the crowd for talented performers or workers, matching people to their strengths." },
      { option: "f", text: "Teach the festival organizers how to manage the event more effectively next year." },
    ],
  },
  {
    id: 4,
    heroImage: "/evp/images/survey/4.webp",
    hero: "The Caverns of Wisdom: Guiding Adventurers",
    question: "As you journey deeper into the kingdom, you come to the Caverns of Wisdom, where adventurers from all over come to learn. How do you help them?",
    options: [
      { option: "a", text: "Facilitate a workshop on effective team collaboration." },
      { option: "b", text: "Provide detailed feedback to improve their skills." },
      { option: "c", text: "Share knowledge on navigating the kingdom’s challenges." },
      { option: "d", text: "Create a structured learning plan for them." },
      { option: "e", text: "Identify their strengths and suggest learning paths." },
      { option: "f", text: "Mentor and guide them step by step." },
    ],
  },
  {
    id: 5,
    heroImage: "/evp/images/survey/5.webp",
    hero: "The Vault of Destiny: Protecting the Kingdom’s Treasure",
    question: "You reach the Vault of Destiny, where the kingdom’s most valuable resources are kept safe. What role do you play in protecting the vault?",
    options: [
      { option: "a", text: "Establish a rotating guard to ensure security." },
      { option: "b", text: "Review security measures and suggest improvements." },
      { option: "c", text: "Design creative decoys to mislead potential thieves." },
      { option: "d", text: "Manage resources and budget for security." },
      { option: "e", text: "Recruit the best guards for protection." },
      { option: "f", text: "Teach guards advanced security tactics." },
    ],
  },
  {
    id: 6,
    heroImage: "/evp/images/survey/6.webp",
    hero: "The Council of the Realm: Choosing a New Hero",
    question: "The Council of the Realm seeks your help to choose a new hero for the kingdom. How do you contribute to the selection process?",
    options: [
      { option: "a", text: "You guide the council in evaluating each hero's strengths, ensuring the selection process is fair and structured." },
      { option: "b", text: "You carefully review each candidate’s qualifications and past achievements, ensuring the best hero is chosen based on merit." },
      { option: "c", text: "You create an inspiring campaign that highlights each candidate’s unique qualities, helping the council make a creative decision." },
      { option: "d", text: "You ensure that the selection process follows the kingdom’s rules and regulations, making sure all protocols are respected." },
      { option: "e", text: "You meet with the heroes personally, interview them to identify their strengths, and ensure they are placed in roles where they will thrive." },
      { option: "f", text: "Mentor the candidates, helping them grow and develop to become the kingdom's future champions." },
    ],
  },
  {
    id: 7,
    heroImage: "/evp/images/survey/7.webp",
    hero: "The Meadows of Harmony: Resolving a Dispute",
    question: "While traveling through the Meadows of Harmony, you encounter a dispute between two villages. How do you resolve the conflict?",
    options: [
      { option: "a", text: "You step in to mediate the situation, facilitating a discussion where both parties can express their concerns and reach an agreement." },
      { option: "b", text: "You gather evidence and carefully analyze the situation, ensuring that the most fair and logical solution is found." },
      { option: "c", text: "You craft a message of unity, using storytelling and visuals to bring the villages together in a creative way." },
      { option: "d", text: "You ensure that both sides have the resources they need to meet halfway, providing a balanced solution that satisfies everyone." },
      { option: "e", text: "You identify key individuals from each village who can help foster communication and understanding, ensuring the right people are involved in resolving the issue." },
      { option: "f", text: "Teach both villages communication strategies, helping them resolve future conflicts on their own." },
    ],
  },
  {
    id: 8,
    heroImage: "/evp/images/survey/8.webp",
    hero: "The Castle of Triumph: Facing a Kingdom-Wide Crisis",
    question: "As you reach the Castle of Triumph, the kingdom faces a looming crisis, and you are called upon to help. What’s your immediate response?",
    options: [
      { option: "a", text: "You quickly assemble a team, delegate tasks, and lead them through the crisis with focus and efficiency." },
      { option: "b", text: "You analyze the situation, identify the problem areas, and ensure that corrective measures are put in place to prevent future issues." },
      { option: "c", text: "You launch a motivational campaign, inspiring the people of the kingdom to unite and push through the crisis together." },
      { option: "d", text: "You balance the kingdom’s resources and time, ensuring that every decision made during the crisis is both practical and sustainable." },
      { option: "e", text: "You quickly assess the skills of the kingdom’s people and assign the right individuals to the tasks needed to resolve the crisis." },
      { option: "f", text: "Offer guidance and training to the kingdom’s citizens, helping them to understand how to manage crises better in the future." },
    ],
  },
  {
    id: 9,
    heroImage: "/evp/images/survey/9.webp",
    hero: "The Grove of Reflection: Discovering Your Truth",
    question: "The Grove of Reflection awaits at the end of your journey, where you must look inward to discover what drives you most. What truth do you find within yourself?",
    options: [
      { option: "a", text: "You excel at coordinating and guiding others toward success." },
      { option: "b", text: "You find satisfaction in improving systems and ensuring everything meets the highest standards." },
      { option: "c", text: "You are most inspired when bringing creative ideas to life and motivating others through innovative approaches." },
      { option: "d", text: "You excel at managing resources, time, and people to ensure everything runs as efficiently as possible." },
      { option: "e", text: "You love identifying talent and helping people find the right roles where they can shine." },
      { option: "f", text: "You find fulfillment in teaching and empowering others to succeed on their own." },
    ],
  }
];

const results = {
  a: {
    title: "Operations <br/> (The Leader’s Path)",
    description:
      "You are a natural leader, always looking to guide teams and ensure success. Operations is your domain, where you can take charge and drive results for the kingdom.",
    //image: "/evp/images/results/operations.webp",
    image: "/evp/images/survey/result.jpg",
  },
  b: {
    title: "Quality Assurance / Security / Compliance <br/> (The Analyst’s Path)",
    description:
      "You are meticulous and detail-oriented, always seeking to improve systems or ensure compliance. You belong in Quality Assurance or Security, protecting the kingdom with your sharp eye for detail.",
    //image: "/evp/images/results/quality.webp",
    image: "/evp/images/survey/result.jpg",
  },
  c: {
    title: "Marketing / Creatives <br/> (The Visionary’s Path)",
    description:
      "You are driven by creativity and the desire to inspire others. Your imagination will shine in Marketing or Creative roles, where you bring ideas to life for the kingdom.",
    //image: "/evp/images/results/marketing.webp",
    image: "/evp/images/survey/result.jpg",
  },
  d: {
    title: "Workforce Management / Finance / HR <br/> (The Strategist’s Path)",
    description:
      "You excel at balancing resources, planning, and ensuring smooth operations. Workforce Management, Finance, or HR is where you’ll thrive, using your strategic mindset to keep the kingdom running smoothly.",
    //image: "/evp/images/results/finance.webp",
    image: "/evp/images/survey/result.jpg",
  },
  e: {
    title: "Recruitment <br/> (The Seeker’s Path)",
    description:
      "You have a keen eye for talent and love helping people find roles where they can excel. The Seeker’s Path is your calling, where you’ll match the kingdom’s people with its greatest needs.",
    //image: "/evp/images/results/recruitment.webp",
    image: "/evp/images/survey/result.jpg",
  },
  f: {
    title: "Training <br/> (The Mentor’s Path)",
    description:
      "You are a patient and insightful mentor, always ready to teach and guide others. The Mentor’s Path leads you to Training, where you will empower the kingdom’s future adventurers by sharing your wisdom.",
    //image: "/evp/images/results/training.webp",
    image: "/evp/images/survey/result.jpg",
  },
};

export default function CareerQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");
  const questionRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Scroll to the top when the question changes
  useEffect(() => {
    if (questionRef.current) {
      questionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentQuestion]);

  const calculateResult = (answers) => {
    const answerCount = {};
    Object.values(answers).forEach((answer) => {
      answerCount[answer] = (answerCount[answer] || 0) + 1;
    });

    // Get the most frequently chosen letter (a, b, c, d, e, f)
    const mostCommonAnswer = Object.entries(answerCount).reduce(
      (acc, curr) => (curr[1] > acc[1] ? curr : acc)
    )[0];

    // Ensure we get the full result (title, description, image)
    const resultData = results[mostCommonAnswer] || {};
    setResult({
      title: resultData.title || "Unknown Path",
      description: resultData.description || "Your adventure is unique. Keep exploring!",
      image: resultData.image || "/evp/images/survey/result.jpg", // ✅ Default image fallback
    });

    setShowResult(true);
  };
  const handleAnswer = (option) => {
    const updatedAnswers = { ...answers, [currentQuestion]: option };
    setAnswers(updatedAnswers);

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(updatedAnswers);
    }
  };

  return (
    <div className="career-quiz-container" ref={questionRef}>
      {!showResult ? (
        <div>
          {/* Progress Bar */}
          <p className="quiz-progress">Question {currentQuestion + 1} / {quizData.length}</p>
          {/* ✅ Hero Image */}
          <img src={quizData[currentQuestion].heroImage} alt="Hero Image" className="quiz-hero-image" />

          {/* ✅ Question Title */}
          <h2 className="quiz-hero">{quizData[currentQuestion].hero}</h2>
          <p className="quiz-question">{quizData[currentQuestion].question}</p>

          {/* ✅ Answer Options */}
          <div className="quiz-options">
            {quizData[currentQuestion].options.map((option) => (
              <button
                key={option.option}
                className="quiz-option"
                onClick={() => handleAnswer(option.option)}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="quiz-result">
          <h2 style={{ marginTop: "100px" }}>Your Path is:</h2>
          {/* ✅ Hero Image */}
          <img style={{ marginTop: "20px" }} src={result.image} alt="Career Path" className="result-hero-image" />

          {/* ✅ Display title with new line */}
          <h3 className="result-title">
            {result.title.split("<br/>").map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </h3>

          {/* ✅ Description */}
          <p className="result-text">{result.description}</p>

          {/* ✅ Back to Tasks Button */}
          <button className="back-home-button" onClick={() => navigate("/tasks")}>
            Back to Tasks
          </button>
        </div>
      )}
    </div>
  );
}
