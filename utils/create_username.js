import { nanoid } from "nanoid";

export default function create_username(name) {
    let result = name.toLowerCase().replace(/\s+/g, '-');
    return (result.length > 15) ? result + nanoid(5) : result;
}
