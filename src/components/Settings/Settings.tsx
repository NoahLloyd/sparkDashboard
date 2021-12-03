import React, { useState } from "react";
import SettingsIcon from "../../assets/icons/SettingsIcon";
import SettingsNagiation from "./SettingsNavigation/SettingsNavigation";
import Setting from "./SettingsCategories/Setting";

export default function Settings() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState("");

  return (
    <>
      <aside className="absolute bottom-0 left-0 m-4">
        {settingsOpen || <SettingsIcon onClick={() => setSettingsOpen(true)} />}
        {settingsOpen && (
          <SettingsNagiation
            onBackdropClick={() => {
              setSettingsOpen(false);
            }}
            onCategoryClick={(category: string) => {
              setCategoryOpen(category);
            }}
          />
        )}
      </aside>
      {categoryOpen && (
        <Setting
          category={categoryOpen}
          onBackdropClick={() => setCategoryOpen("")}
        >
          Setting
        </Setting>
      )}
    </>
  );
}
