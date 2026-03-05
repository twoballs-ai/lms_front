"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SiteService from "../../services/siteNoAuth.service";
import CustomCard from "../../components/reUseComponents/Cards";
import { serverUrl } from "../../shared/config";
import "./TraineerPage.scss";

interface TrainerCategory {
    id: number;
    title: string;
}

interface Trainer {
    id: number;
    title: string;
    description: string;
    cover_path: string;
}

const TrainerPage: React.FC = () => {
    const [categories, setCategories] = useState<TrainerCategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<TrainerCategory | null>(null);
    const [allTrainers, setAllTrainers] = useState<Trainer[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleCardClick = (trainerId: number) => {
        if (isMounted) {
            router.push(`/trainer-detail/${trainerId}`);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryResponse = await SiteService.getTraineerCategory({ toSelect: false });
                if (categoryResponse.status === 200 || categoryResponse.status === 201) {
                    setCategories(categoryResponse.data.data);
                }
                fetchTrainers();
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        document.title = selectedCategory
            ? `Тренажеры - ${selectedCategory.title}`
            : "Тренажеры - Все категории";
    }, [selectedCategory]);

    const fetchTrainers = async (category_id: number | null = null) => {
        const params: { category_id?: number } = {};
        if (category_id) params.category_id = category_id;

        try {
            const trainersResponse = await SiteService.getTrainers(params);
            if (trainersResponse.status === 200 || trainersResponse.status === 201) {
                setAllTrainers(trainersResponse.data.data);
            }
        } catch (error) {
            console.error("Error fetching trainers", error);
        }
    };

    const handleCategorySelect = (category: TrainerCategory | null) => {
        setSelectedCategory(category);
        fetchTrainers(category ? category.id : null);
    };

    if (!isMounted) return null;

    return (
        <div className="trainer-page">
            <div className="category-filter">
                <button className="category-button" onClick={() => handleCategorySelect(null)}>
                    Все тренажеры
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        className="category-button"
                        onClick={() => handleCategorySelect(cat)}
                    >
                        {cat.title}
                    </button>
                ))}
            </div>

            <p>
                Выбрана категория: {selectedCategory ? selectedCategory.title : "Нет выбранной категории"}
            </p>

            <div className="trainers-list">
                {allTrainers.map((trainer) => (
                    <div
                        key={trainer.id}
                        className="card-wrapper"
                        onClick={() => handleCardClick(trainer.id)}
                    >
                        <CustomCard
                            title={trainer.title}
                            description={trainer.description}
                            image={`${serverUrl}/${trainer.cover_path}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrainerPage;