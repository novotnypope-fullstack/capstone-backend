import db from "#db/client";

export async function getAllFaculty() {
  const sql = `
    SELECT f.*, 
      json_build_object('id', d.id, 'name', d.name) AS department
    FROM faculty f
    JOIN departments d ON f.department_id = d.id
    ORDER BY f.created_at DESC
  `;
  const { rows } = await db.query(sql);
  return rows;
}

export async function getFacultyById(id) {
  const sql = `
    SELECT f.*,
      json_build_object('id', d.id, 'name', d.name) AS department
    FROM faculty f
    JOIN departments d ON f.department_id = d.id
    WHERE f.id = $1
  `;
  const {
    rows: [member],
  } = await db.query(sql, [id]);
  return member;
}

export async function createFaculty(
  name,
  bio,
  email,
  profileImageUrl,
  departmentId
) {
  const sql = `
    INSERT INTO faculty (name, bio, email, profile_image_url, department_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const {
    rows: [member],
  } = await db.query(sql, [name, bio, email, profileImageUrl, departmentId]);
  return member;
}

export async function updateFaculty(
  id,
  name,
  bio,
  email,
  profileImageUrl,
  departmentId
) {
  const sql = `
    UPDATE faculty
    SET name = $1, bio = $2, email = $3, profile_image_url = $4, department_id = $5, updated_at = NOW()
    WHERE id = $6
    RETURNING *
  `;
  const {
    rows: [member],
  } = await db.query(sql, [
    name,
    bio,
    email,
    profileImageUrl,
    departmentId,
    id,
  ]);
  return member;
}

export async function deleteFaculty(id) {
  const sql = `DELETE FROM faculty WHERE id = $1 RETURNING id`;
  const {
    rows: [member],
  } = await db.query(sql, [id]);
  return member;
}
