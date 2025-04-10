using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace data.Migrations
{
    /// <inheritdoc />
    public partial class AddClassColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FilePath",
                table: "ExamsUploads",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Score",
                table: "ExamsUploads",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "StudentName",
                table: "ExamsUploads",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "SubmissionNumber",
                table: "ExamsUploads",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "UploadDate",
                table: "ExamsUploads",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "ExamsUploads",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Class",
                table: "Exams",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FilePath",
                table: "ExamsUploads");

            migrationBuilder.DropColumn(
                name: "Score",
                table: "ExamsUploads");

            migrationBuilder.DropColumn(
                name: "StudentName",
                table: "ExamsUploads");

            migrationBuilder.DropColumn(
                name: "SubmissionNumber",
                table: "ExamsUploads");

            migrationBuilder.DropColumn(
                name: "UploadDate",
                table: "ExamsUploads");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "ExamsUploads");

            migrationBuilder.DropColumn(
                name: "Class",
                table: "Exams");
        }
    }
}
