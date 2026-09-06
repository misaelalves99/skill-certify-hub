# Stage 09.005 - Evidence Verification Design

## Authority

- Task: task.skillcertify.09.005
- Dependency: task.skillcertify.09.004
- Frozen source matrix SHA-256: 9de69194b9c83f7a9d22d50cdbbd3d5ca7fade50b199d415187bde489e72f44d
- Starting merge commit: c385c9569bac1d09f0ee02c68ace5ab9c360ae28

## Objective

Revalidate recoverable SkillCertify evidence references, authorship, scope and reproducibility before mapped claims may be reused.

## Verification dimensions

1. Reference retrieval and accessibility.
2. Authorship or contribution authority where relevant.
3. Evidence scope relative to the mapped requirement.
4. Reproducibility or independent recoverability.
5. Claim support after limitations are applied.

## Invariants

- URL or evidence-ID presence is not verification.
- Repository ownership is not exclusive authorship.
- Repository dates are not employment duration.
- Similar technology is not exact technology experience.
- Deployment presence is not performance evidence.
- English code or documentation is not proof of advanced English proficiency.
- Coverage inherited from 09.004 is provisional until this task completes.
- A coverage value may move upward only with direct verified evidence.
- A coverage value must move downward when verification invalidates inherited support.

## Initial state

- Requirement rows inherited: 14
- Unique evidence refs: 21
- Verification records initially verified: 0
- Final evidence verification performed: false
- Vacancy fit established: false
- Application authorized: false

## Human gate

Final factual and privacy review remains mandatory after evidence verification and requirement coverage redecision.
