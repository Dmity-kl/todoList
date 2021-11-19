import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddCircleOutline} from "@material-ui/icons";

type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormType) => {
    console.log('AddItemForms is called')
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addTask();
        }
    }

    const addTask = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }


    return <div style={{textAlign: 'center'}}>
        <TextField value={title}
                   label={'add value'}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   error={!!error}
                   helperText={error}
        />
        <IconButton onClick={addTask}
                    color={"primary"}
                    size={"small"}>
            <AddCircleOutline/>
        </IconButton>
    </div>

});