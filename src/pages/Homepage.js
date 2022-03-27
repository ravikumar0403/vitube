import landingImage from "asset/landing-page.png";
import { CategoryGrid } from "components";
import { useCategories } from "context";

export const Homepage = () => {
  const { categories } = useCategories();

  return (
    <main className="main container">
      <section className="grid grid-50-50 align-center">
        <div>
          <h2 className="text-primary">Grow your video editing skills</h2>
          <p className="text-justify pr-5">
            Learn everything you need to know about video editing from experts
            with real-world experience. Explore our courses and tutorials below
            and start taking your video editing skills to the next level today!
          </p>
        </div>
        <img src={landingImage} alt="" />
      </section>
      {categories.map((category) => (
        <CategoryGrid key={category._id} category={category} />
      ))}
    </main>
  );
};
