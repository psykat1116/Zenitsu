import { db } from "@/lib/db";
import { countryList } from "@/lib/Country";

countryList.forEach((country) => {
  const term = country.toUpperCase();
  const terms: { member: string }[] = [];

  for (let i = 0; i <= term.length; i++) {
    terms.push({ member: term.substring(0, i) });
  }
  terms.push({ member: term + "*" });

  const populateDB = async () => {
    await db.data.createMany({
      data: terms.map((term) => ({
        string: term.member,
      })),
    });
  };

  populateDB();
});
