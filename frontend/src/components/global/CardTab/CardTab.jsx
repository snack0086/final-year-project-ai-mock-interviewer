import Card from "../Card/Card";
import "./CardTab.css";

export default function CardTab({ Title, Desc }) {
  return (
    <section className="features" id="features">
      <div className="container">
        <h2 className="section-title">Why Choose recruit.ai?</h2>
        <p className="section-subtitle">
          Everything you need to streamline interviews and hire faster
        </p>

        <div className="features-grid">
          <Card
            Title="Real-Time Candidate Insights"
            Desc="Track candidate responses in real-time with clean, interactive analytics. Get instant clarity on skill fit, communication quality, and overall performance."
            icon="fas fa-chart-line"
          />
          <Card
            Title="AI-Driven Interview Scoring"
            Desc="Let advanced AI evaluate every answer with precision. Receive automated scoring, competency breakdowns, and detailed skill-fit metrics."
            icon="fas fa-star-half-alt"
          />
          <Card
            Title="Smart Question Personalization"
            Desc="Generate tailored interview questions based on job role and candidate profile. Ensure every interview stays relevant, structured, and efficient."
            icon="fas fa-magic"
          />
          <Card
            Title="Automated Report Generation"
            Desc="Receive polished, shareable interview reports instantly. Includes transcripts, performance highlights, improvement areas, and final recommendations."
            icon="fas fa-file-alt"
          />
          <Card
            Title="Seamless Multi-Role Support"
            Desc="Designed for both candidates and HR teams. Switch views easily and access the exact tools you need for smooth interview workflows."
            icon="fas fa-users-cog"
          />
          <Card
            Title="Secure, Scalable Infrastructure"
            Desc="Built with enterprise-grade security and scalability. Your interview data stays encrypted, compliant, and ready to handle growing hiring needs."
            icon="fas fa-lock"
          />
        </div>
      </div>
    </section>
  );
}
