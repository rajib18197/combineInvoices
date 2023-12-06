import Filters from "../../ui/Filters";
import ListOperations from "../../ui/ListOperations";
import SortBy from "../../ui/SortBy";
import { useGetAllProjectsQuery } from "./projectsApi";

const sortOptions = [
  { value: "name-asc", label: "Sort By Name(low first)" },
  { value: "name-desc", label: "Sort By Name(high first)" },
  { value: "dueDate-asc", label: "Sort By Due Date(earlier first)" },
  { value: "dueDate-desc", label: "Sort By Due Date(recent first)" },
  {
    value: "projectName-asc",
    label: "Sort By Project Name(low first)",
  },
  {
    value: "projectName-desc",
    label: "Sort By Project Name(high first)",
  },
  { value: "totalPrice-asc", label: "Sort By Total Price(low first)" },
  { value: "totalPrice-desc", label: "Sort By Total Price(high first)" },
];

export default function InvoiceListOperations() {
  const { data: projects, isLoading, isError } = useGetAllProjectsQuery();

  if (isLoading) return <h2>Loading</h2>;
  if (!isLoading && isError) return <h2>Error Occured</h2>;
  if (!isLoading && !isError && projects.length === 0)
    return <h2>No Projects found at this moment</h2>;

  const projectoptions = projects.map((project) => ({
    value: project.name.toLowerCase().split(" ").join("-"),
    label: project.name,
  }));

  // console.log(projectoptions);
  return (
    <ListOperations>
      <Filters
        filterField="projects"
        options={[{ value: "all", label: "All" }, ...projectoptions]}
      />

      <SortBy options={sortOptions} />
    </ListOperations>
  );
}

// Personal Board of Advisors

// Having a "mentor" has become too formal.

// Instead, seek to create a diverse group of 5-10 people you can go to for questions, advice, or feedback.

// If you can't ask them directly -- consume their content then ask: "What would X do in my situation?"

// The Story Bank

// At the end of each day, spend 5 minutes asking yourself:

// “What was the most storyworthy moment of today?”

// Then write a sentence or two about your experience.

// Retrain yourself to find stories hidden in everyday moments.

// Confidence Portfolio

// "You don't become confident by shouting affirmations in the mirror. You become confident by having a stack of undeniable proof that you are who you say you are."

// Every time you do something that reinforces your beliefs, add it to your Confidence Portfolio.

// Cheerleading File

// Keep a cheerleading album on your phone.

// • Any milestones
// • Testimonials
// • Kind words

// Save them to your folder.

// Anytime you feel down - or need to write a sales page...

// Open your cheerleading file.

// Education Tax

// Dedicate a % of your income for self-education:

// • Books
// • Courses
// • Mentorships

// Even if it's just $10 a month, it's better than nothing.

// The Luck Razor

// When stuck between two equal decisions, take the path that will produce the most luck down the road.

// While we can't predict the future, we can position ourselves to have a greater Luck Surface Area.

// Optimize for serendipity.

// The Law of 100

// If you focus on results at the start, you're doomed to fail.

// Instead, focus on putting out 100 reps.

// If you do 100 reps of something, it's nearly impossible to not improve.

// The Weekend Test

// What the smartest people do on the weekend is what everyone else will do during the week in ten years.

// "The future is already here, it's just not evenly distributed."

// The Hourglass Method

// In almost every endeavor, our path follows an Hourglass:

// • Experiment
// • Double down
// • Diversify

// Less deciding, more experimenting.

// The Clarity Paradox

// We want clarity to start, but clarity is only gained after starting.

// The path becomes clearer as you take action.

// When in doubt, just start.

// The Magic Johnson Effect

// In every situation, we can either make people feel bigger after interacting with us -- or we can make them feel smaller.

// A question to ask yourself: "How can I make this moment more magical for THEM?"

// Be the friend you wish to have.

// Finite vs. Infinite Games

// Finite Games are played to be won. The goal is to "beat" the competition.

// Infinite Games are played to keep playing. The goal is to keep the game going.

// Understand the difference and play accordingly.

// Energy Givers vs. Energy Vampires

// Energy Givers talk about ideas, their mission, and the future.

// Energy Vampires gossip, complain, and think life is after them.

// Surround yourself with people who give you energy, not take it.
