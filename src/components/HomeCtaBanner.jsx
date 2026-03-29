import { Link } from "react-router-dom";

export default function HomeCtaBanner() {
  return (
    <section className="bg-indigo-600 rounded-[3rem] p-12 text-white text-center space-y-6">
      <h2 className="text-3xl md:text-4xl font-bold">Ready to start building?</h2>
      <p className="text-indigo-100 text-lg max-w-2xl mx-auto">
        Join thousands of creators who use IdeaHub to organize their workflow and
        bring their visions to life.
      </p>
      <Link
        to="/register"
        className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-full font-bold hover:bg-indigo-50 transition-colors"
      >
        Create Your Account
      </Link>
    </section>
  );
}
