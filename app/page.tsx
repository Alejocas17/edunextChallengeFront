import { title } from "@/components/primitives";
export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Welcome &nbsp;</span>
        <br />
        <span className={title()}>to the landing page for subscription admin</span>
      </div>

      <div className="flex flex-col">
        <br />
        <span>Please go to Subscription page to select your subscription plan.</span>
        <br />
        <span>You can update your subscription features by clicking on Profile</span>
      </div>
    </section>
  );
}
