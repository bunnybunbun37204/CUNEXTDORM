"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BedDouble } from "lucide-react";
import { useMemo, useState } from "react";
import React from "react";

type BedStatus = "available" | "selected" | "booked";

class Bed {
	constructor(
		public readonly label: string,
		public readonly status: BedStatus,
	) {}
}

class Room {
	constructor(
		public readonly id: string,
		public readonly beds: Bed[],
	) {}
}

class Floor {
	constructor(
		public readonly id: string,
		public readonly rooms: Room[],
	) {}
}

class Building {
	constructor(
		public readonly id: string,
		public readonly name: string,
		public readonly floors: Floor[],
	) {}

	getFloor(floorId: string): Floor | undefined {
		return this.floors.find((f) => f.id === floorId);
	}
}

// Building creation functions
function createBuilding(id: string, name: string, floors: number, roomsPerFloor: number): Building {
	const floorsArray: Floor[] = [];

	for (let floorNum = 1; floorNum <= floors; floorNum++) {
		const floorId = `floor${floorNum}`;
		const rooms = generateRooms(floorNum, roomsPerFloor);
		floorsArray.push(new Floor(floorId, rooms));
	}

	return new Building(id, name, floorsArray);
}

function generateRooms(floorNumber: number, count: number): Room[] {
	return Array.from({ length: count }, (_, i) => {
		const roomNumber = floorNumber * 100 + i + 1;
		return new Room(
			`room${roomNumber}`,
			["A", "B", "C", "D"].map((label) => new Bed(label, getRandomStatus())),
		);
	});
}

function getRandomStatus(): BedStatus {
	return Math.random() < 0.5 ? "available" : "booked";
}

export default function BedSelection() {
	const [selectedBed, setSelectedBed] = useState<string | null>(null);
	const [selectedBuildingId, setSelectedBuildingId] = useState("building1");
	const [selectedFloorId, setSelectedFloorId] = useState("floor1");

	const buildings = useMemo(
		() => [createBuilding("building1", "ตึกจำปา", 3, 20), createBuilding("building2", "ตึกจำปี", 3, 20)],
		[],
	);

	const selectedBuilding = useMemo(
		() => buildings.find((b) => b.id === selectedBuildingId),
		[buildings, selectedBuildingId],
	);

	const selectedFloor = useMemo(() => selectedBuilding?.getFloor(selectedFloorId), [selectedBuilding, selectedFloorId]);

	const handleBedSelect = (roomId: string, bedLabel: string) => {
		const newSelection = `${roomId}-${bedLabel}`;
		setSelectedBed((prev) => (prev === newSelection ? null : newSelection));
	};

	const handleSubmit = () => {
		if (selectedBed) {
			const [roomId, bedLabel] = selectedBed.split("-");
			alert(`Selected ${roomId} - ${bedLabel}`);
		} else {
			alert("กรุณาเลือกเตียง");
		}
	};

	return (
		<div className="max-w-6xl mx-auto p-6">
			<section className="flex gap-4 mb-6">
				<Select value={selectedBuildingId} onValueChange={setSelectedBuildingId}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="เลือกตึก" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{buildings.map((building) => (
								<SelectItem key={building.id} value={building.id}>
									{building.name}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>

				<Select value={selectedFloorId} onValueChange={setSelectedFloorId}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="เลือกชั้น" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{selectedBuilding?.floors.map((floor) => (
								<SelectItem key={floor.id} value={floor.id}>
									{floor.id.replace("floor", "ชั้นที่ ")}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</section>

			<div className="grid grid-cols-2 gap-4">
				{selectedFloor?.rooms.map((room) => (
					<RoomCard key={room.id} room={room} selectedBed={selectedBed} onBedSelect={handleBedSelect} />
				))}
			</div>

			<Card className="mt-6 p-4 sticky bottom-0 bg-background">
				<div className="flex justify-between items-center">
					<div>
						{selectedBed ? (
							<>
								<span className="font-semibold">เตียงที่เลือก:</span>
								<span className="ml-2">
									{selectedBuilding?.name} <br />
									{selectedFloor?.id.replace("floor", "ชั้นที่ ")}{" "}
									{selectedBed.replace("-", " เตียง ").replace("room", "ห้อง ")}
								</span>
							</>
						) : (
							"กรุณาเลือกเตียง"
						)}
					</div>
					<Button disabled={!selectedBed} onClick={handleSubmit}>
						ยืนยันการจอง
					</Button>
				</div>
			</Card>
		</div>
	);
}

const RoomCard = React.memo(
	({
		room,
		selectedBed,
		onBedSelect,
	}: {
		room: Room;
		selectedBed: string | null;
		onBedSelect: (roomId: string, bedLabel: string) => void;
	}) => (
		<Card className="p-2 pb-4">
			<div className="flex flex-col justify-between items-center">
				<h3 className="font-semibold mb-1">ห้อง {room.id.replace("room", "")}</h3>
				<div className="grid grid-cols-2 gap-2">
					{room.beds.map((bed) => (
						<Button
							key={bed.label}
							variant="ghost"
							className={`h-8 px-3 relative ${
								bed.status === "booked" ? "cursor-not-allowed" : "cursor-pointer"
							} ${selectedBed === `${room.id}-${bed.label}` ? "bg-blue-500 text-white" : "bg-gray-100"}`}
							disabled={bed.status === "booked"}
							onClick={() => onBedSelect(room.id, bed.label)}
						>
							<div className="flex items-center gap-2">
								{bed.status === "available" && <BedDouble className="h-4 w-4" />}
								{bed.status === "booked" && <BedDouble className="h-4 w-4 text-red-500" />}
								<span>{bed.label}</span>
							</div>
						</Button>
					))}
				</div>
			</div>
		</Card>
	),
);
