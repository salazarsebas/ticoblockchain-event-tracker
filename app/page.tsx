import EnVivoView from "./_views/EnVivoView";

export const revalidate = 10;

export default function EnVivoPage() {
  return <EnVivoView now={new Date()} simulated={null} />;
}
