import db from "#db/client";

export async function getAllDepartments() {
  const sql = `SELECT * FROM departments ORDER BY created_at DESC`;
  const { rows } = await db.query(sql);
  return rows;
}

export async function getDepartmentById(id) {
  const sql = `
    SELECT d.*,
      COALESCE(
        json_agg(
          json_build_object(
            'id', f.id,
            'name', f.name,
            'email', f.email,
            'profile_image_url', f.profile_image_url
          )
        ) FILTER (WHERE f.id IS NOT NULL),
        '[]'
      ) AS faculty
    FROM departments d
    LEFT JOIN faculty f ON f.department_id = d.id
    WHERE d.id = $1
    GROUP BY d.id
  `;
  const {
    rows: [department],
  } = await db.query(sql, [id]);
  return department;
}

export async function createDepartment(
  name,
  description,
  contactEmail,
  contactPhone,
  bannerImageUrl
) {
  const sql = `
    INSERT INTO departments (name, description, contact_email, contact_phone, banner_image_url)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const {
    rows: [department],
  } = await db.query(sql, [
    name,
    description,
    contactEmail,
    contactPhone,
    bannerImageUrl,
  ]);
  return department;
}

export async function updateDepartment(
  id,
  name,
  description,
  contactEmail,
  contactPhone,
  bannerImageUrl
) {
  const sql = `
    UPDATE departments
    SET name = $1, description = $2, contact_email = $3, contact_phone = $4, banner_image_url = $5
    WHERE id = $6
    RETURNING *
  `;
  const {
    rows: [department],
  } = await db.query(sql, [
    name,
    description,
    contactEmail,
    contactPhone,
    bannerImageUrl,
    id,
  ]);
  return department;
}

export async function deleteDepartment(id) {
  const sql = `DELETE FROM departments WHERE id = $1 RETURNING id`;
  const {
    rows: [department],
  } = await db.query(sql, [id]);
  return department;
}
