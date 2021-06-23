import "./styles.css"

export const TextInput = ({ handleChange, searchValue }) => (
 <input className ="text-input" type="search" placeholder="Search" onChange={handleChange} value={searchValue} />
)