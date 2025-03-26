"use client";

import { Role } from "@prisma/client";
import { ChangeEvent, useState, KeyboardEvent } from "react";

export function RoleSelector({ availableRoles, initialRoles = [] }: { availableRoles: Role[], initialRoles?: Role[] }) {
  const [selectedRoles, setSelectedRoles] = useState(initialRoles);
  const [inputValue, setInputValue] = useState("");

  const addRole = (roleName: string) => {
    if (roleName && !selectedRoles.find(role => role.name === roleName)) {
      const role = availableRoles.find(role => role.name === roleName);
      if (!role) return;
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const removeRole = (roleName: string) => {
    setSelectedRoles(selectedRoles.filter(role => role.name !== roleName));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      addRole(inputValue.trim());
      setInputValue("");
      e.preventDefault();
    }
  };

  // Filter suggestions based on the input value and exclude already selected roles by comparing ids
  const suggestions = availableRoles.filter(role =>
    role.name.toLowerCase().includes(inputValue.toLowerCase()) &&
    !selectedRoles.some(selected => selected.id === role.id)
  );

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Display selected roles as tags */}
      <div className="flex flex-wrap gap-2 mb-2" data-testid='role-display'>
        {selectedRoles.map(role => (
          <span key={role.id} className="inline-flex items-center bg-blue-100 text-blue-700 px-2 py-1 rounded-full" data-testid={`${role.name.toLowerCase()}-role`}>
            {role.name}
            <button
              type="button"
              className="ml-1 text-blue-900"
              onClick={() => removeRole(role.name)}
            >
              &times;
            </button>
          </span>
        ))}
      </div>

      {/* Hidden inputs to pass role ids in the form submission */}
      {selectedRoles.map(role => (
        <input key={role.id} type="hidden" name="roleIds[]" value={role.id} />
      ))}

      {/* Input for adding roles */}
      <input data-testid="role-input"
        type="text"
        placeholder="Enter a role"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Autocomplete suggestions -- own component? */}
      {inputValue && suggestions.length > 0 && (
        <ul className="border border-gray-300 mt-1 rounded-lg max-h-40 overflow-y-auto" data-testid="role-suggestions">
          {suggestions.map(suggestion => (
            <li
              key={suggestion.id}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                addRole(suggestion.name);
                setInputValue("");
              }}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
