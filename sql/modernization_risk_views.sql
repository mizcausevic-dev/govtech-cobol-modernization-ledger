create or replace view public_sector.modernization_asset_risk as
with scored as (
  select
    system_id,
    owner,
    primary_language,
    citizen_impact,
    batch_window_hours,
    defect_backlog,
    audit_gaps,
    interface_count,
    data_contract_age_months,
    funding_readiness,
    least(
      100,
      (
        citizen_impact * 0.24
          + batch_window_hours * 2.1
          + defect_backlog * 1.35
          + audit_gaps * 5.4
          + interface_count * 2.2
          + data_contract_age_months * 0.85
          - funding_readiness * 0.28
      ) * case when lower(primary_language) = 'cobol' then 1.18 else 1 end
    ) as modernization_risk_score
  from public_sector.raw_modernization_ledger
)
select
  system_id,
  owner,
  primary_language,
  citizen_impact,
  batch_window_hours,
  defect_backlog,
  audit_gaps,
  interface_count,
  data_contract_age_months,
  funding_readiness,
  modernization_risk_score,
  case
    when modernization_risk_score >= 72 then 'urgent'
    when modernization_risk_score >= 42 then 'sequence'
    else 'ready'
  end as modernization_posture
from scored;

create or replace view public_sector.board_modernization_posture as
select
  modernization_posture,
  count(*) as system_count,
  avg(modernization_risk_score) as average_modernization_risk,
  max(modernization_risk_score) as max_modernization_risk
from public_sector.modernization_asset_risk
group by modernization_posture;
