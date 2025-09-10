// src/pages/WasteQuiz.jsx
import React, { useState } from "react";

export default function WasteQuiz() {
  const quizData = [
    {
      questionNumber: 1,
      question: "Which of the following items is generally considered recyclable?",
      topic: "Recyclable Materials",
      imageUrl:
        "https://placehold.co/600x400/D1FAE5/1F2937?text=Recycling+Bin+and+Can",
      hint: "Think about materials that can be easily reprocessed into new products.",
      answerOptions: [
        {
          text: "Plastic grocery bag",
          rationale:
            "Plastic grocery bags can jam recycling machinery and should be recycled at special drop-off locations, not in curbside bins.",
          isCorrect: false,
        },
        {
          text: "Empty aluminum soda can",
          rationale:
            "Aluminum cans are highly valuable and can be recycled repeatedly without loss of quality.",
          isCorrect: true,
        },
        {
          text: "Styrofoam cup",
          rationale:
            "Styrofoam is difficult and expensive to recycle, so it is typically not accepted in municipal recycling programs.",
          isCorrect: false,
        },
        {
          text: "Used pizza box with grease stains",
          rationale:
            "Grease and food residue can contaminate the paper recycling process, making the entire batch unusable.",
          isCorrect: false,
        },
      ],
    },
    {
      questionNumber: 2,
      question: "What is the primary benefit of composting organic waste?",
      topic: "Composting",
      imageUrl: "https://placehold.co/600x400/BFDBFE/1F2937?text=Compost+Pile",
      hint: "Consider what happens to things like food scraps and yard trimmings in a natural environment.",
      answerOptions: [
        {
          text: "It helps to generate electricity for homes.",
          rationale:
            "While some waste-to-energy plants can process certain types of waste, composting's main goal is not energy production.",
          isCorrect: false,
        },
        {
          text: "It reduces landfill waste and creates nutrient-rich soil.",
          rationale:
            "Composting breaks down organic materials into a valuable soil amendment, which helps improve soil health.",
          isCorrect: true,
        },
        {
          text: "It provides material for creating new plastic bottles.",
          rationale:
            "Composting only handles organic materials and cannot be used to create new plastic products.",
          isCorrect: false,
        },
        {
          text: "It is the only way to dispose of glass and metal.",
          rationale:
            "Glass and metal are non-organic materials that are recycled in dedicated facilities, not through composting.",
          isCorrect: false,
        },
      ],
    },
    {
      questionNumber: 3,
      question:
        "Which of the following items should be placed in the non-recyclable waste bin?",
      topic: "Non-Recyclable Materials",
      imageUrl:
        "https://placehold.co/600x400/D1D5DB/1F2937?text=Dirty+Coffee+Cup",
      hint: "Think about items that are made of mixed materials or contain substances that are hard to separate.",
      answerOptions: [
        {
          text: "Clean paper coffee cup",
          rationale:
            "Most paper coffee cups have a plastic or wax lining that makes them non-recyclable and they should be placed in the trash.",
          isCorrect: true,
        },
        {
          text: "Empty glass jar",
          rationale:
            "Glass jars are generally recyclable and can be processed into new glass products.",
          isCorrect: false,
        },
        {
          text: "Cardboard shipping box",
          rationale:
            "Cardboard is a valuable recyclable material that can be pulped and reused for new paper products.",
          isCorrect: false,
        },
        {
          text: "Empty plastic milk jug",
          rationale:
            "Plastic jugs are a common recyclable item that can be reprocessed into new plastic products.",
          isCorrect: false,
        },
      ],
    },
    {
      questionNumber: 4,
      question:
        "Why is it important to separate glass bottles and jars from other recyclables?",
      topic: "Glass and Contamination",
      imageUrl:
        "https://placehold.co/600x400/FFB3B3/1F2937?text=Broken+Glass+Shards",
      hint: "Consider the physical properties of glass and how it interacts with other materials when it is crushed.",
      answerOptions: [
        {
          text: "To prevent them from being accidentally thrown away.",
          rationale:
            "While proper sorting helps ensure they are not thrown away, the main reason for separation is related to the processing of the materials.",
          isCorrect: false,
        },
        {
          text: "To avoid contamination and to prevent them from breaking and damaging other materials.",
          rationale:
            "Glass can shatter into small shards that contaminate other recyclables like paper and plastic, which can damage recycling machinery and reduce the value of the materials.",
          isCorrect: true,
        },
        {
          text: "Because glass recycling is not profitable.",
          rationale:
            "While the profitability of recycling can fluctuate, it is still a significant reason for separate collection.",
          isCorrect: false,
        },
        {
          text: "To make them easier to compost.",
          rationale:
            "Glass is not an organic material and cannot be composted.",
          isCorrect: false,
        },
      ],
    },
    {
      questionNumber: 5,
      question: "What is the best way to dispose of used coffee grounds?",
      topic: "Compostable Materials",
      imageUrl:
        "https://placehold.co/600x400/8B4513/FFFFFF?text=Used+Coffee+Grounds",
      hint: "These grounds are an excellent source of nitrogen for your garden.",
      answerOptions: [
        {
          text: "Put them in the trash",
          rationale:
            "Coffee grounds can be a valuable resource and don't belong in a landfill.",
          isCorrect: false,
        },
        {
          text: "Pour them down the sink drain",
          rationale:
            "This can cause plumbing clogs and is not an environmentally friendly way to dispose of them.",
          isCorrect: false,
        },
        {
          text: "Compost them",
          rationale:
            "Coffee grounds are a great source of organic matter and can be added to your compost pile to enrich soil.",
          isCorrect: true,
        },
        {
          text: "Recycle them with plastics",
          rationale:
            "Coffee grounds are an organic material and cannot be recycled with plastics.",
          isCorrect: false,
        },
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [userPerformance, setUserPerformance] = useState([]);
  const [showHint, setShowHint] = useState(false);

  const handleAnswer = (option) => {
    if (answered) return;
    setAnswered(true);

    const updatedPerformance = [...userPerformance];
    updatedPerformance.push({
      topic: quizData[currentQuestion].topic,
      correct: option.isCorrect,
    });
    setUserPerformance(updatedPerformance);

    if (option.isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(false);
      setShowHint(false);
    } else {
      setShowFinal(true);
    }
  };

  const handleSkip = () => {
    const updatedPerformance = [...userPerformance];
    updatedPerformance.push({
      topic: quizData[currentQuestion].topic,
      correct: false,
      skipped: true,
    });
    setUserPerformance(updatedPerformance);
    handleNext();
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setAnswered(false);
    setShowFinal(false);
    setUserPerformance([]);
    setShowHint(false);
  };

  const generateAnalysis = () => {
    const topics = {};
    userPerformance.forEach((perf) => {
      if (!topics[perf.topic]) {
        topics[perf.topic] = { total: 0, correct: 0, skipped: 0 };
      }
      topics[perf.topic].total++;
      if (perf.correct) topics[perf.topic].correct++;
      if (perf.skipped) topics[perf.topic].skipped++;
    });

    return Object.entries(topics).map(([topic, data], i) => {
      let icon = "";
      let color = "";
      let feedbackText = "";

      if (data.skipped > 0) {
        icon = "⏩";
        color = "text-gray-500";
        feedbackText = `You skipped ${data.skipped} question(s) in this topic.`;
      } else if (data.correct === data.total) {
        icon = "✅";
        color = "text-green-600";
        feedbackText = "You mastered this topic!";
      } else {
        icon = "⚠️";
        color = "text-yellow-600";
        feedbackText = "You might want to review this topic.";
      }

      return (
        <div key={i} className={`flex items-center mb-2 font-medium ${color}`}>
          <span className="mr-2">{icon}</span>
          <span>
            <strong>{topic}</strong>: {feedbackText}
          </span>
        </div>
      );
    });
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 to-blue-200 p-6">
      <div className="quiz-container w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8">
        {!showFinal ? (
          <>
            <div className="flex justify-between mb-6 font-semibold">
              <span>Score: {score}</span>
              <span>
                Question {currentQuestion + 1} of {quizData.length}
              </span>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
              {quizData[currentQuestion].imageUrl && (
                <img
                  src={quizData[currentQuestion].imageUrl}
                  alt="Question"
                  className="w-full max-h-52 object-contain rounded-lg shadow mb-4"
                />
              )}
              <p className="text-xl font-bold text-center mb-6">
                {quizData[currentQuestion].question}
              </p>

              <div className="grid gap-4">
                {quizData[currentQuestion].answerOptions.map((option, i) => {
                  const isCorrect = option.isCorrect;
                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(option)}
                      disabled={answered}
                      className={`px-4 py-3 rounded-lg shadow-md text-left font-medium transition-all ${
                        answered
                          ? isCorrect
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {option.text}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div className="mt-4 p-3 rounded-lg bg-gray-100 text-sm italic">
                  {quizData[currentQuestion].answerOptions.find(
                    (o) => o.isCorrect
                  ).rationale}
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSkip}
                className="px-5 py-2 bg-gray-500 text-white rounded-full font-bold uppercase shadow hover:bg-gray-600"
              >
                Skip
              </button>
              <button
                onClick={() => setShowHint(true)}
                className="px-5 py-2 bg-yellow-500 text-white rounded-full font-bold uppercase shadow hover:bg-yellow-600"
              >
                Hint
              </button>
              {answered && (
                <button
                  onClick={handleNext}
                  className="px-5 py-2 bg-green-600 text-white rounded-full font-bold uppercase shadow hover:bg-green-700"
                >
                  Next
                </button>
              )}
            </div>

            {showHint && (
              <div className="mt-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 rounded">
                {quizData[currentQuestion].hint}
              </div>
            )}
          </>
        ) : (
          <div className="text-center space-y-6">
            <p className="text-lg font-semibold">Quiz Complete!</p>
            <h2 className="text-3xl font-bold text-green-600">
              Final Score: {score} / {quizData.length}
            </h2>

            <div className="bg-gray-50 p-6 rounded-xl shadow-inner text-left">
              <h3 className="text-lg font-bold mb-4">Performance Analysis</h3>
              {generateAnalysis()}
            </div>

            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-blue-600 text-white rounded-full font-bold uppercase shadow hover:bg-blue-700"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

