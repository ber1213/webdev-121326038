import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const migrationSql = readFileSync(new URL('../migrations/001_create_labs.sql', import.meta.url), 'utf8');

test('labs migration stores capacity and infrastructure fields', () => {
  assert.match(migrationSql, /CREATE TABLE labs\s*\(/);
  for (const column of ['lab_number', 'seat_capacity', 'has_pcs', 'has_projector', 'has_large_screen', 'has_wifi']) {
    assert.match(migrationSql, new RegExp(`\\b${column}\\b`));
  }
  assert.match(migrationSql, /CHECK\s*\(seat_capacity\s*>\s*0\)/);
});

test('labs migration seeds three distinct labs', () => {
  const seededLabRows = [...migrationSql.matchAll(/\('([A-Z]\d{3})',\s*(\d+),\s*(TRUE|FALSE),\s*(TRUE|FALSE),\s*(TRUE|FALSE),\s*(TRUE|FALSE)\)/g)];
  assert.deepEqual(seededLabRows.map((row) => row[1]), ['B101', 'B202', 'C305']);
});
