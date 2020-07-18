module.exports = (id, startdate, enddate, replaces, replacedby, ordinal) => {
  const qualifiers = { }

  // Seems like there should be a better way of filtering these...
  if (startdate && startdate != "''")   qualifiers['P580']  = startdate
  if (enddate && enddate != "''")       qualifiers['P582']  = enddate
  if (replaces && replaces != "''")     qualifiers['P1365'] = replaces
  if (replacedby && replacedby != "''") qualifiers['P1366'] = replacedby
  if (ordinal && ordinal != "''")       qualifiers['P1545'] = ordinal

  if (startdate && enddate && startdate != "''" && enddate != "''" &&
    (startdate > enddate)) throw new Error(`Invalid dates: ${startdate} / ${enddate}`)

  return {
    id,
    claims: {
      P39: {
        value: 'Q26932328',
        qualifiers: qualifiers,
        references: {
          P143: 'Q8447', // frwiki
          P4656: 'https://fr.wikipedia.org/wiki/Minist%C3%A8re_des_Affaires_%C3%A9trang%C3%A8res_(Alg%C3%A9rie)'
        },
      }
    }
  }
}
