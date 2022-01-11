import React, {useEffect, useState} from 'react'
import Checkbox from '../../../UI/Checkbox';

interface Props {
    
}

const NotesSetting = (props: Props) => {
    const [notesEnabled, setNotesEnabled] = useState(true);
    useEffect(() => {
      chrome.storage.sync.get(["notesSetting"], (storage) => {
        setNotesEnabled(storage.notesSetting);
      });
    }, []);
  
    return (
      <div className="text-center">
        <Checkbox
          enabled={notesEnabled}
          onClick={(checked: boolean) => {
            chrome.storage.sync.set({ notesSetting: checked });
          }}
        />
      </div>
    );
}

export default NotesSetting
