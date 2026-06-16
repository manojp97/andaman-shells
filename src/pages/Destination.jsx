import { useParams } from "react-router-dom";
import destinations from "@/data/destinations";

export default function Destination() {
  const { slug } = useParams();

  const data = destinations[slug];

  if (!data) {
    return <h1>Page Not Found</h1>;
  }

  return (
    <div>
      <img
        src={data.image}
        alt={data.title}
        className="w-full h-125 object-cover"
      />

      <div className="max-w-7xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold mb-4">
          {data.title}
        </h1>

        <p>{data.description}</p>
      </div>
    </div>
  );
}