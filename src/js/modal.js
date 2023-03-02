import { nameEdit, hobbyEdit, profileName, profileHobby } from "./constant";

function fillProfileInputs() {
    nameEdit.value = profileName.innerText;
    hobbyEdit.value = profileHobby.innerText;
}

export { fillProfileInputs }