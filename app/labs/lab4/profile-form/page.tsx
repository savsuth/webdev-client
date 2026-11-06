import ProfileForm from "../profile/ProfileForm";
import ContextProfileForm from "../context/ContextProfileForm";
import ZustandProfileForm from "../zustand/ZustandProfileForm";

// The three versions of the profile form side by side: useState, React Context, and Zustand.
export default function ProfileFormsPage() {
  return (
    <div id="wd-lab4-profile-forms" className="flex flex-col gap-8 p-4">
      <h2>Profile Forms</h2>
      <ProfileForm />
      <ContextProfileForm />
      <ZustandProfileForm />
    </div>
  );
}
