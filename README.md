Note: This repo is largely a snapshop record of bring Wikidata
information in line with Wikipedia, rather than code specifically
deisgned to be reused.

The code and queries etc here are unlikely to be updated as my process
evolves. Later repos will likely have progressively different approaches
and more elaborate tooling, as my habit is to try to improve at least
one part of the process each time around.

---------

Step 1: Check the Position Item
===============================

The Wikidata item for the [Minister of Foreign Affairs of Algeria](https://www.wikidata.org/wiki/Q26932328)
already has everything we expect — nothing to do here.

Step 2: Tracking page
=====================

PositionHolderHistory page created at https://www.wikidata.org/w/index.php?title=Talk:Q26932328&oldid=1233879385

Current status 8 dated officeholders, and 12 dated; 22 warnings.

Step 3: Set up the metadata
===========================

The first step in the repo is always to edit the [add_P39.js script](add_P39.js)
to configure the Item ID and source URL.

Step 4: Scrape
==============

Comparison/source = [Ministère des Affaires étrangères (Algérie)](https://fr.wikipedia.org/wiki/Minist%C3%A8re_des_Affaires_%C3%A9trang%C3%A8res_(Alg%C3%A9rie))

    wb ee --dry add_P39.js  | jq -r '.claims.P39.references.P4656' |
      xargs bundle exec ruby scraper.rb | tee wikipedia.csv

Worked first time with no changes to the scraper.

Step 5: Get local copy of Wikidata information
==============================================

    wd ee --dry add_P39.js | jq -r '.claims.P39.value' |
      xargs wd sparql office-holders.js | tee wikidata.json

Step 6: Create missing P39s
===========================

    bundle exec ruby new-P39s.rb wikipedia.csv wikidata.json |
      wd ee --batch --summary "Add missing P39s, from $(wb ee --dry add_P39.js | jq -r '.claims.P39.references.P4656')"

3 new additions as officeholders -> https://tools.wmflabs.org/editgroups/b/wikibase-cli/56f21af04b847

Step 7: Add missing qualifiers
==============================

    bundle exec ruby new-qualifiers.rb wikipedia.csv wikidata.json |
      wd aq --batch --summary "Add missing qualifiers, from $(wb ee --dry add_P39.js | jq -r '.claims.P39.references.P4656')"

50 additions made as https://tools.wmflabs.org/editgroups/b/wikibase-cli/e3b37e76313f4

This also has quite a few suggested improvements to existing qualifiers,
mostly to add higher precision dates. I selected these and added them
via

    pbpaste | wd uq --batch --summary "Update qualifiers from https://fr.wikipedia.org/wiki/Minist%C3%A8re_des_Affaires_%C3%A9trang%C3%A8res_(Alg%C3%A9rie)"

-> https://tools.wmflabs.org/editgroups/b/wikibase-cli/2271be9d0a697

Step 8: Refresh the Tracking Page
=================================

New version:


