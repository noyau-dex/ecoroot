import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import Navbar from "../components/navbar"

const channelsData = [
  {
    id: 1,
    icon: "T",
    color: "bg-green-500",
    name: "The Tree Foundation",
    category: "Nature & Environment",
    project: "Urban Tree Planting",
    description:
      "Help us plant native trees in urban parks and restore green spaces. Learn about local ecosystems.",
    enrolled: 15,
    total: 50,
  },
  {
    id: 2,
    icon: "C",
    color: "bg-purple-500",
    name: "Community Clean-Up",
    category: "Waste Management",
    project: "Neighborhood Recycling Drive",
    description:
      "Join us in our weekly recycling drives to educate residents and sort waste properly.",
    enrolled: 42,
    total: 75,
  },
  {
    id: 3,
    icon: "E",
    color: "bg-yellow-500",
    name: "Educational Outreach",
    category: "Community Support",
    project: "Tech Literacy Workshops",
    description:
      "Volunteer to teach basic computer and internet skills to senior citizens and low-income families.",
    enrolled: 8,
    total: 20,
  },
  {
    id: 4,
    icon: "U",
    color: "bg-orange-500",
    name: "Unnat Bharat Abhiyan",
    category: "Social Development",
    project: "Rural Tech Adoption",
    description:
      "Work with village communities to identify needs and implement sustainable solutions using local resources and technology.",
    enrolled: 10,
    total: 30,
  },
];

export default function Community() {
  const [channels, setChannels] = useState(channelsData);

  const handleEnroll = (id) => {
    setChannels((prev) =>
      prev.map((ch) => {
        if (ch.id === id && ch.enrolled < ch.total) {
          return { ...ch, enrolled: ch.enrolled + 1, enrolledFlag: true };
        }
        return ch;
      })
    );
  };

  return (
    <>
    
      <Navbar/>
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <header className="text-center mb-14">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Community Hub
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Discover local NGOs, enroll in meaningful projects, and make a
          difference in your community.
        </motion.p>
      </header>

      {/* NGO CTA */}
      <motion.div
        className="bg-eco-green text-white rounded-3xl p-8 md:p-10 mb-16 flex flex-col md:flex-row items-center justify-between shadow-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="md:w-3/4 text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-3xl font-bold mb-2">Are You an NGO?</h2>
          <p className="text-emerald-100">
            Create your community channel to connect with students and organize
            projects.
          </p>
        </div>
        <Button
          variant="secondary"
          className="rounded-full px-8 py-3 font-bold hover:scale-105 transition-transform"
        >
          Create Channel
        </Button>
      </motion.div>

      {/* Active Channels */}
      <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
        Active Channels
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {channels.map((ch, idx) => (
          <motion.div
            key={ch.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="rounded-3xl shadow-md flex flex-col h-full">
              <CardContent className="p-6 flex flex-col flex-grow">
                {/* NGO Info */}
                <div className="flex items-center mb-4">
                  <div
                    className={`w-12 h-12 ${ch.color} rounded-full flex items-center justify-center text-white text-xl font-bold mr-4`}
                  >
                    {ch.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">
                      {ch.name}
                    </h3>
                    <p className="text-sm text-gray-500">{ch.category}</p>
                  </div>
                </div>

                {/* Project Info */}
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  {ch.project}
                </h4>
                <p className="text-sm text-gray-600 mb-4 flex-grow">
                  {ch.description}
                </p>

                {/* Footer */}
                <div className="mt-auto pt-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-1" />
                    <span className="text-sm">
                      {ch.enrolled}/{ch.total} students
                    </span>
                  </div>
                  <Button
                    className="rounded-full px-6 py-2 font-semibold transition-transform hover:scale-105"
                    disabled={ch.enrolledFlag || ch.enrolled >= ch.total}
                    onClick={() => handleEnroll(ch.id)}
                  >
                    {ch.enrolled >= ch.total
                      ? "Full"
                      : ch.enrolledFlag
                      ? "Enrolled"
                      : "Enroll"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
    </>
  );
}
