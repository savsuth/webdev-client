"use client";

import Link from "next/link";
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import CounterBroken from "./CounterBroken";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ProfileForm from "./profile/ProfileForm";
import ParentStateComponent from "./ParentStateComponent";
import PropDrilling from "./PropDrilling";
import UrlEncoding from "./UrlEncoding";
import ContextExamples from "./context/ContextExamples";
import ContextProfileForm from "./context/ContextProfileForm";
import ZustandExamples from "./zustand/ZustandExamples";
import ZustandProfileForm from "./zustand/ZustandProfileForm";
import ReduxExamples from "./redux/ReduxExamples";
import Effect from "./Effect";

export default function Lab4() {
  const sayHello = (message: string) => {
    alert(message);
  };
  const sayMyName = () => {
    alert("My name is Aasav Alpeshbhai Suthar");
  };
  return (
    <div id="wd-lab4">
      <h2>Lab 4</h2>
      <ClickEvent />
      <PassingDataOnEvent />
      <PassingFunctions
        theFunction={sayHello}
        message="Hello from Lab 4"
        sayMyName={sayMyName}
        theOtherFunction={() => alert("Sample from parent")}
      />
      <CounterBroken />
      <Counter />
      <BooleanStateVariables />
      <StringStateVariables />
      <DateStateVariable />
      <ObjectStateVariable />
      <ArrayStateVariable />
      <ProfileForm />
      <hr />
      <ParentStateComponent />
      <PropDrilling />
      <UrlEncoding />
      <ContextExamples />
      <ContextProfileForm />
      <hr />
      <ZustandExamples />
      <ZustandProfileForm />
      <hr />
      <ReduxExamples />
      <Effect />
      <h2>More Lab 4 Pages</h2>
      <ul>
        <li>
          <Link href="/labs/lab4/hooks" id="wd-lab4-hooks-link">
            Writing Your Own Hooks
          </Link>
        </li>
        <li>
          <Link href="/labs/lab4/profile-form" id="wd-lab4-profile-form-link">
            Profile Forms (useState, Context, Zustand)
          </Link>
        </li>
      </ul>
    </div>
  );
}
