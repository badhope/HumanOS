import { useParams, Navigate } from 'react-router-dom'
import TrainingEngine from '../../components/training/TrainingEngine'
import { getTrainingById } from '../../data/training-library'

export default function UniversalTraining() {
  const { programId } = useParams<{ programId: string }>()
  const program = getTrainingById(programId || '')

  if (!program) {
    return <Navigate to="/app/training" replace />
  }

  return <TrainingEngine program={program} />
}
