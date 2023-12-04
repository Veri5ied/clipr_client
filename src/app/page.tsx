import AppLayout from "@/layout/AppLayout";

export default function Home() {
  return (
    <AppLayout>
      <div className="landingpage">
        <div className="landingpage__conatiner App__container">
          <h1>
            Craft and showcase <span>stunning source codes</span> visually.
          </h1>
          <p>
            Clipr caters to developers, educators, content creators, and tech
            enthusiasts seeking an elegant way to showcase their code snippets
            visually.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
