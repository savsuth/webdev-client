import Link from "next/link";
import Image from "next/image";

export default function CourseCard({
  id,
  title,
  subtitle,
  image,
}: {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}) {
  return (
    <div className="wd-dashboard-course">
      <Link href={`/courses/${id}/home`} className="wd-dashboard-course-link">
        {/* next/image optimizes these local thumbnails; Lab 1 uses plain <img> on purpose to show the raw HTML tag. */}
        <Image src={image} width={200} height={150} alt={title} />
        <div>
          <h5>{title}</h5>
          <p className="wd-dashboard-course-title">{subtitle}</p>
          <button type="button">Go</button>
        </div>
      </Link>
    </div>
  );
}
