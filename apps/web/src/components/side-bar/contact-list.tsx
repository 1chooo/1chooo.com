import React from "react";
import ContactItem from "@/components/side-bar/contact-item";
import type { IconType as ReactIconType } from "react-icons";
import type { Icon as OcticonsType } from "@primer/octicons-react";

import "@/styles/side-bar/contact-list.css";

interface Contact {
  icon: ReactIconType | OcticonsType;
  title: string;
  content?: string;
  link?: string;
}

interface ContactsListProps {
  contacts: Contact[];
}

function ContactsList({ contacts }: ContactsListProps) {
  return (
    <ul className="contacts-list">
      {contacts.map((contact, index) => (
        <ContactItem key={index} contact={contact} />
      ))}
    </ul>
  );
};

export default ContactsList;
