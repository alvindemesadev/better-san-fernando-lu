import {
  Briefcase,
  BriefcaseBusiness,
  FileBadge,
  GraduationCap,
  HandHeart,
  HardHat,
  HeartPulse,
  Landmark,
  Leaf,
  ReceiptText,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Sprout,
  Users,
  type LucideIcon,
} from 'lucide-react'

const icons: Record<string, LucideIcon> = {
  Briefcase,
  BriefcaseBusiness,
  FileBadge,
  GraduationCap,
  HandHeart,
  HardHat,
  HeartPulse,
  Landmark,
  Leaf,
  ReceiptText,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Sprout,
  Users,
}

interface CategoryIconProps {
  name: string
  className?: string
}

export function CategoryIcon({ name, className }: CategoryIconProps) {
  const Icon = icons[name] ?? Landmark
  return <Icon aria-hidden="true" className={className} />
}
